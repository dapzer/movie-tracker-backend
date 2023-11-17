import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import {
  MediaDetailsRepositoryInterface,
  MediaDetailsRepositorySymbol,
} from '@/repositories/mediaDetails/MediaDetailsRepositoryInterface';
import {
  MediaItemRepositoryInterface,
  MediaItemRepositorySymbol,
} from '@/repositories/mediaItem/MediaItemRepositoryInterface';
import { MediaDetailsDto } from '@/routes/mediaDetails/dto/mediaDetails.dto';
import { ConfigService } from '@nestjs/config';
import { generateApiUrl } from '@/shared/utils/generateApiUrl';
import { DetailsType } from '@/shared/dto/DetailsType';
import { convertMediaDetailsToMediaDetailsInfo } from '@/shared/utils/convertMediaDetailsToMediaDetailsInfo';
import { convertArrayToChunks } from '@/shared/utils/convertArrayToChunks';
import { MediaItemDto } from '@/routes/mediaItem/dto/mediaItem.dto';
import { Interval } from '@nestjs/schedule';
import { getMillisecondsFromHours } from '@/shared/utils/getMillisecondsFromHours';

@Injectable()
export class MediaDetailsService implements OnModuleInit {
  private updatingProgress = {
    successfulUpdates: 0,
    failedUpdates: 0,
  };
  private readonly logger = new Logger('MediaDetailsService');
  private getApiUrl = generateApiUrl(this.configService.get('TMDB_API_URL'), {
    api_key: this.configService.get('TMDB_API_KEY'),
  });

  constructor(
    @Inject(MediaDetailsRepositorySymbol)
    private mediaDetailsRepository: MediaDetailsRepositoryInterface,
    @Inject(MediaItemRepositorySymbol)
    private readonly mediaItemRepository: MediaItemRepositoryInterface,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    this.createOrUpdateAllMediaItemsDetails();
  }

  @Interval(getMillisecondsFromHours(8))
  async autoUpdateAllMediaDetails() {
    this.createOrUpdateAllMediaItemsDetails();
  }

  private async getMediaDetailsItemFromApi(
    mediaId: number,
    mediaType: MediaDetailsDto['mediaType'],
    language: string,
  ): Promise<DetailsType.RootObject | null> {
    const response = await fetch(
      this.getApiUrl(`/${mediaType.toLowerCase()}/${mediaId}`, {
        language,
      }),
    );

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  }

  private async getAllMediaDetails(
    mediaId: number,
    mediaType: MediaDetailsDto['mediaType'],
  ) {
    try {
      const [ru, en] = await Promise.all([
        this.getMediaDetailsItemFromApi(mediaId, mediaType, 'ru'),
        this.getMediaDetailsItemFromApi(mediaId, mediaType, 'en'),
      ]);

      return {
        ru,
        en,
      };
    } catch (error) {
      this.logger.error('Failed to get data from TMDB.');

      return {
        ru: null,
        en: null,
      };
    }
  }

  async createOrUpdateMediaDetails(
    mediaId: number,
    mediaType: MediaDetailsDto['mediaType'],
    skipError: boolean = false,
    mediaItem?: MediaItemDto,
  ) {
    const { ru, en } = await this.getAllMediaDetails(mediaId, mediaType);

    if (!ru || !en) {
      this.updatingProgress.failedUpdates += 1;

      if (skipError) {
        return null;
      }

      throw new HttpException('Media details not found', HttpStatus.NOT_FOUND);
    }

    const mediaDetails = await this.mediaDetailsRepository.getMediaDetailsItem(
      mediaId,
      mediaType,
    );

    let mediaDetailsItem: MediaDetailsDto | null = null;

    try {
      if (!mediaDetails) {
        mediaDetailsItem = await this.mediaDetailsRepository.createMediaDetails(
          mediaId,
          mediaType,
          convertMediaDetailsToMediaDetailsInfo(ru),
          convertMediaDetailsToMediaDetailsInfo(en),
          en.vote_average || 0,
        );
      }

      mediaDetailsItem = await this.mediaDetailsRepository.updateMediaDetails(
        mediaId,
        mediaType,
        convertMediaDetailsToMediaDetailsInfo(ru),
        convertMediaDetailsToMediaDetailsInfo(en),
        en?.vote_average || 0,
      );

      if (mediaDetails && mediaItem && !mediaItem?.mediaDetailsId) {
        await this.mediaItemRepository.updateMediaItem(mediaItem.id, {
          mediaDetailsId: mediaDetailsItem.id,
        });
      }

      this.updatingProgress.successfulUpdates += 1;

      return mediaDetailsItem;
    } catch (error) {
      this.updatingProgress.failedUpdates += 1;

      if (skipError) {
        return null;
      }

      throw new HttpException(
        'Failed to create or update media details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createOrUpdateAllMediaItemsDetails() {
    const mediaItems = await this.mediaItemRepository.getAllMediaItems();

    if (!mediaItems) {
      throw new HttpException('Media items not found', HttpStatus.NOT_FOUND);
    }

    const chunks = convertArrayToChunks(mediaItems, 20);
    let iteration = 1;
    this.updatingProgress = {
      successfulUpdates: 0,
      failedUpdates: 0,
    };

    for (const chunk of chunks) {
      const promiseArr = chunk.map((mediaItem) => {
        return this.createOrUpdateMediaDetails(
          mediaItem.mediaId,
          mediaItem.mediaType,
          true,
          mediaItem,
        );
      });

      await Promise.all(promiseArr);

      if (iteration < chunks.length) {
        iteration += 1;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    this.logger.log(
      `Successfully updated ${this.updatingProgress.successfulUpdates} media details. Failed to update ${this.updatingProgress.failedUpdates} media details`,
    );

    return this.updatingProgress;
  }
}

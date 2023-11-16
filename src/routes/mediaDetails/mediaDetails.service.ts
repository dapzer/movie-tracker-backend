import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class MediaDetailsService {
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
      throw new HttpException(
        `${error.status}: Failed to get data from TMDB.`,
        HttpStatus.BAD_GATEWAY,
      );
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

      return mediaDetailsItem;
    } catch (error) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return true;
  }

  async getMediaDetailsItem(
    mediaId: number,
    mediaType: MediaDetailsDto['mediaType'],
  ) {
    return this.mediaDetailsRepository.getMediaDetailsItem(mediaId, mediaType);
  }
}

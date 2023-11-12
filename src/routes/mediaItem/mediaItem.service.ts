import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  MediaItemRepositoryInterface,
  MediaItemRepositorySymbol,
} from '@/repositories/mediaItem/MediaItemRepositoryInterface';
import { MediaItemDto } from '@/routes/mediaItem/dto/mediaItem.dto';
import {
  MediaListRepositoryInterface,
  MediaListRepositorySymbol,
} from '@/repositories/mediaList/MediaListRepositoryInterface';

@Injectable()
export class MediaItemService {
  constructor(
    @Inject(MediaListRepositorySymbol)
    private readonly mediaListRepository: MediaListRepositoryInterface,
    @Inject(MediaItemRepositorySymbol)
    private readonly mediaItemRepository: MediaItemRepositoryInterface,
  ) {}

  private async isMediaItemOwner(
    id: string,
    userId: string,
    mediaItemBase?: MediaItemDto,
  ) {
    const mediaItem =
      mediaItemBase ?? (await this.mediaItemRepository.getMediaItemById(id));
    const mediaList = await this.mediaListRepository.getMedialListById(
      mediaItem.mediaListId,
    );

    if (!mediaItem || !mediaList) {
      throw new HttpException(
        `Media item with id '${id}' doesn't exist.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return mediaList.userId === userId;
  }

  async createMediaItem(
    mediaId: number,
    mediaType: MediaItemDto['mediaType'],
    mediaListId: string,
    userId: string,
  ) {
    const mediaList =
      await this.mediaListRepository.getMedialListById(mediaListId);

    if (!mediaList) {
      throw new HttpException(
        `Media list with id '${mediaListId}' doesn't exist.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (mediaList.userId !== userId) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    return this.mediaItemRepository.createMediaItem(
      mediaId,
      mediaType,
      mediaListId,
    );
  }

  async getMediaItemsByListId(mediaListId: string, userId: string) {
    const mediaList =
      await this.mediaListRepository.getMedialListById(mediaListId);

    if (mediaList && mediaList.userId !== userId && !mediaList.isPublic) {
      throw new HttpException(`Unauthorized.`, HttpStatus.UNAUTHORIZED);
    }

    return this.mediaItemRepository.getMediaItemsByListId(mediaListId);
  }

  async deleteMediaItem(id: string, userId: string) {
    const isMediaItemOwner = await this.isMediaItemOwner(id, userId);

    if (!isMediaItemOwner) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    return this.mediaItemRepository.deleteMediaItem(id);
  }

  async updateMediaItemTrackingData(
    id: string,
    trackingData: MediaItemDto['trackingData'],
    userId: string,
  ) {
    const isMediaItemOwner = await this.isMediaItemOwner(id, userId);

    if (!isMediaItemOwner) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    return this.mediaItemRepository.updateMediaItemTrackingData(
      id,
      trackingData,
    );
  }
}

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

  async createMediaItem(
    mediaId: number,
    mediaType: MediaItemDto['mediaType'],
    mediaListId: string,
  ) {
    const mediaList =
      await this.mediaListRepository.getMedialListById(mediaListId);

    if (!mediaList) {
      throw new HttpException(
        `Media list with id '${mediaListId}' doesn't exist.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mediaItemRepository.createMediaItem(
      mediaId,
      mediaType,
      mediaListId,
    );
  }

  async getMediaItemsByListId(mediaListId: string) {
    return this.mediaItemRepository.getMediaItemsByListId(mediaListId);
  }

  async getMediaItemById(id: string) {
    return this.mediaItemRepository.getMediaItemById(id);
  }

  async deleteMediaItem(id: string) {
    return this.mediaItemRepository.deleteMediaItem(id);
  }

  async updateMediaItemTrackingData(
    id: string,
    trackingData: MediaItemDto['trackingData'],
  ) {
    return this.mediaItemRepository.updateMediaItemTrackingData(
      id,
      trackingData,
    );
  }
}

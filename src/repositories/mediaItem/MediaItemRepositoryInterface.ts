import { MediaItemDto } from '@/routes/mediaItem/dto/mediaItem.dto';

export const MediaItemRepositorySymbol = Symbol();

export interface MediaItemRepositoryInterface {
  getMediaItemById: (id: string) => Promise<MediaItemDto>;

  getMediaItemsByListId: (mediaListId: string) => Promise<MediaItemDto[]>;

  createMediaItem: (
    mediaId: number,
    mediaType: string,
    mediaListId: string,
  ) => Promise<MediaItemDto>;

  deleteMediaItem: (id: string) => Promise<MediaItemDto>;

  updateMediaItemTrackingData: (
    id: string,
    trackingData: MediaItemDto['trackingData'],
  ) => Promise<MediaItemDto>;
}

import { MediaListDto } from '@/routes/mediaList/dto/mediaList.dto';

export const MediaListRepositorySymbol = Symbol();

export interface MediaListRepositoryInterface {
  getAllMedialLists: () => Promise<MediaListDto[]>;

  getMedialListById: (id: string) => Promise<MediaListDto>;

  getMedialListsByUserId: (userId: string) => Promise<MediaListDto[]>;

  createMediaList: (
    userId: string,
    isSystem?: boolean,
  ) => Promise<MediaListDto>;

  deleteMediaList: (id: string) => Promise<MediaListDto>;

  updateMediaList: (
    id: string,
    body: Pick<MediaListDto, 'title' | 'poster' | 'isPublic'>,
  ) => Promise<MediaListDto>;
}

import { Inject, Injectable } from '@nestjs/common';
import { UpdateMediaListDto } from '@/routes/mediaList/dto/updateMediaList.dto';
import {
  MediaListRepositoryInterface,
  MediaListRepositorySymbol,
} from '@/repositories/mediaList/MediaListRepositoryInterface';

@Injectable()
export class MediaListService {
  constructor(
    @Inject(MediaListRepositorySymbol)
    private readonly mediaListRepository: MediaListRepositoryInterface,
  ) {}

  async getAllMedialLists() {
    return this.mediaListRepository.getAllMedialLists();
  }

  async getMedialListById(id: string) {
    return this.mediaListRepository.getMedialListById(id);
  }

  async getMedialListByUserId(userId: string) {
    return this.mediaListRepository.getMedialListsByUserId(userId);
  }

  async createMediaList(userId: string) {
    return this.mediaListRepository.createMediaList(userId);
  }

  async updateMediaList(id: string, body: UpdateMediaListDto) {
    return this.mediaListRepository.updateMediaList(id, body);
  }

  async deleteMediaList(id: string) {
    return this.mediaListRepository.deleteMediaList(id);
  }
}

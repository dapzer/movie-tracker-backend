import { Inject, Injectable } from '@nestjs/common';
import {
  MediaListRepositoryInterface,
  MediaListRepositorySymbol,
} from '@/repositories/mediaList/MediaListRepositoryInterface';

@Injectable()
export class UserService {
  constructor(
    @Inject(MediaListRepositorySymbol)
    private readonly mediaListRepository: MediaListRepositoryInterface,
  ) {}

  async getUserMediaListsById(userId: string) {
    return this.mediaListRepository.getMedialListsByUserId(userId);
  }
}

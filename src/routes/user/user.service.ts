import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { MediaListService } from '@/routes/mediaList/mediaList.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mediaListService: MediaListService,
  ) {}

  async getUserMediaListsById(userId: string) {
    return this.mediaListService.getMedialListByUserId(userId);
  }
}

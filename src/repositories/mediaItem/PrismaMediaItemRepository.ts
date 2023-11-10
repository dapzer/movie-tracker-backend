import { PrismaService } from '@/services/prisma.service';
import { MediaItemRepositoryInterface } from '@/repositories/mediaItem/MediaItemRepositoryInterface';
import { StatusNameEnum } from '@prisma/client';
import { MediaItemDto } from '@/routes/mediaItem/dto/mediaItem.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaMediaItemRepository implements MediaItemRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getMediaItemById(id: string) {
    return this.prisma.mediaItem.findUnique({
      where: { id },
    });
  }

  async getMediaItemsByListId(mediaListId: string) {
    return this.prisma.mediaItem.findMany({
      where: {
        mediaListId,
      },
    });
  }

  async createMediaItem(
    mediaId: number,
    mediaType: MediaItemDto['mediaType'],
    mediaListId: string,
  ) {
    return this.prisma.mediaItem.create({
      data: {
        mediaListId,
        mediaId,
        mediaType,
        trackingData: {
          currentStatus: StatusNameEnum.NOT_VIEWED,
          note: '',
          sitesToView: [],
          score: null,
          seriesInfo: {
            currentSeason: 0,
            currentEpisode: 1,
          },
        },
      },
    });
  }

  async deleteMediaItem(id: string) {
    return this.prisma.mediaItem.delete({
      where: {
        id,
      },
    });
  }

  async updateMediaItemTrackingData(
    id: string,
    trackingData: MediaItemDto['trackingData'],
  ) {
    return this.prisma.mediaItem.update({
      where: { id },
      data: {
        trackingData,
      },
    });
  }
}

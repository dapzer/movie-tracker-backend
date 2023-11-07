import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { MediaTypeEnum, StatusNameEnum } from '@prisma/client';
import { MediaItemTrackingDataDto } from '@/routes/mediaItem/dto/mediaItemTrackingDataDto.dto';
import { MediaListService } from '@/routes/mediaList/mediaList.service';

@Injectable()
export class MediaItemService {
  constructor(
    private prisma: PrismaService,
    private mediaListService: MediaListService,
  ) {}

  async createMediaItem(
    mediaId: number,
    mediaType: MediaTypeEnum,
    mediaListId: string,
  ) {
    const mediaList =
      await this.mediaListService.getMedialListById(mediaListId);

    if (!mediaList) {
      throw new HttpException(
        `Media list with id '${mediaListId}' doesn't exist.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.mediaItem.create({
      data: {
        mediaListId,
        mediaId,
        mediaType,
        trackingData: {
          currentStatus: StatusNameEnum.NOT_VIEWED,
          note: '',
          sitesToView: [],
          seriesInfo: {
            currentSeason: 0,
            currentEpisode: 1,
          },
        },
      },
    });
  }

  async getMediaItemsByListId(mediaListId: string) {
    return this.prisma.mediaItem.findMany({
      where: {
        mediaListId,
      },
    });
  }

  async getMediaItemById(id: string) {
    return this.prisma.mediaItem.findFirst({
      where: { id },
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
    trackingData: MediaItemTrackingDataDto,
  ) {
    return this.prisma.mediaItem.update({
      where: { id },
      data: {
        trackingData,
      },
    });
  }
}

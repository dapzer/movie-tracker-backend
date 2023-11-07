import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { UpdateMediaListDto } from '@/routes/mediaList/dto/updateMediaList.dto';

@Injectable()
export class MediaListService {
  constructor(private prisma: PrismaService) {}

  async getAllMedialLists() {
    return this.prisma.mediaList.findMany();
  }

  async getMedialListById(id: string) {
    return this.prisma.mediaList.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getMedialListByUserId(userId: string) {
    return this.prisma.mediaList.findMany({
      where: {
        userId,
      },
    });
  }

  async createMediaList(userId: string) {
    return this.prisma.mediaList.create({
      data: {
        userId,
      },
    });
  }

  async updateMediaList(id: string, body: UpdateMediaListDto) {
    return this.prisma.mediaList.update({
      where: { id },
      data: {
        ...body,
      },
    });
  }
}

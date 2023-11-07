import { Module } from '@nestjs/common';
import { MediaListController } from '@/routes/mediaList/mediaList.controller';
import { MediaListService } from '@/routes/mediaList/mediaList.service';
import { PrismaService } from '@/services/prisma.service';

@Module({
  imports: [],
  controllers: [MediaListController],
  providers: [MediaListService, PrismaService],
  exports: [MediaListService],
})
export class MediaListModule {}

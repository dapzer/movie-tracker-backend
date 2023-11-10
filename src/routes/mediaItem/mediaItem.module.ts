import { Module } from '@nestjs/common';
import { MediaItemController } from '@/routes/mediaItem/mediaItem.controller';
import { MediaItemService } from '@/routes/mediaItem/mediaItem.service';
import { MediaListModule } from '@/routes/mediaList/mediaList.module';
import { MediaItemRepositorySymbol } from '@/repositories/mediaItem/MediaItemRepositoryInterface';
import { PrismaMediaItemRepository } from '@/repositories/mediaItem/PrismaMediaItemRepository';
import { MediaListRepositorySymbol } from '@/repositories/mediaList/MediaListRepositoryInterface';
import { PrismaMediaListRepository } from '@/repositories/mediaList/PrismaMediaListRepository';

@Module({
  controllers: [MediaItemController],
  providers: [
    MediaItemService,
    { provide: MediaListRepositorySymbol, useClass: PrismaMediaListRepository },
    { provide: MediaItemRepositorySymbol, useClass: PrismaMediaItemRepository },
  ],
  imports: [MediaListModule],
})
export class MediaItemModule {}

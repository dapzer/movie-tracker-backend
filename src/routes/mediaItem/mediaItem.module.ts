import { Module } from '@nestjs/common';
import { MediaItemController } from '@/routes/mediaItem/mediaItem.controller';
import { MediaItemService } from '@/routes/mediaItem/mediaItem.service';
import { PrismaService } from '@/services/prisma.service';
import { MediaListModule } from '@/routes/mediaList/mediaList.module';

@Module({
  controllers: [MediaItemController],
  providers: [MediaItemService, PrismaService],
  imports: [MediaListModule],
})
export class MediaItemModule {}

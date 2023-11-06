import { Module } from '@nestjs/common';
import { MediaItemController } from '@/routes/mediaItem/mediaItem.controller';
import { MediaItemService } from '@/routes/mediaItem/mediaItem.service';
import { PrismaService } from '@/services/prisma.service';

@Module({
  controllers: [MediaItemController],
  providers: [MediaItemService, PrismaService],
})
export class MediaItemModule {}

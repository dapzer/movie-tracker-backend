import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MediaItemService } from '@/routes/mediaItem/mediaItem.service';
import { CreateMediaItemDto } from '@/routes/mediaItem/dto/createMediaItem.dto';
import { MediaItemTrackingDataDto } from '@/routes/mediaItem/dto/mediaItemTrackingDataDto.dto';
import { MongoDbIdDto } from '@/shared/dto/mongoDbId.dto';
import { MediaItemListIdDto } from '@/shared/dto/mediaItemListId.dto';

@Controller('mediaItem')
export class MediaItemController {
  constructor(private readonly mediaItemService: MediaItemService) {}

  @Post()
  async createMediaItem(@Body() body: CreateMediaItemDto) {
    return this.mediaItemService.createMediaItem(
      body.mediaId,
      body.mediaType,
      body.mediaListId,
    );
  }

  @Get()
  async getMediaItemsByListId(@Query() query: MediaItemListIdDto) {
    return this.mediaItemService.getMediaItemsByListId(query.mediaListId);
  }

  @Get(':id')
  async getMediaItemById(@Param() params: MongoDbIdDto) {
    return this.mediaItemService.getMediaItemById(params.id);
  }

  @Delete(':id')
  async deleteMediaItem(@Param() params: MongoDbIdDto) {
    return this.mediaItemService.deleteMediaItem(params.id);
  }

  @Patch(':id')
  async updateMediaItemTrackingData(
    @Param() param: MongoDbIdDto,
    @Body() body: MediaItemTrackingDataDto,
  ) {
    return this.mediaItemService.updateMediaItemTrackingData(param.id, body);
  }
}

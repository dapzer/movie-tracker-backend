import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MediaListService } from '@/routes/mediaList/mediaList.service';
import { MongoDbIdDto } from '@/shared/dto/mongoDbId.dto';
import { UpdateMediaListDto } from '@/routes/mediaList/dto/updateMediaList.dto';

@Controller('mediaList')
export class MediaListController {
  constructor(private readonly mediaListService: MediaListService) {}

  @Get()
  async getAllMedialLists() {
    return this.mediaListService.getAllMedialLists();
  }

  @Get(':id')
  async getMedialListById(@Param() params: MongoDbIdDto) {
    return this.mediaListService.getMedialListById(params.id);
  }

  @Post()
  async createMediaList() {
    const userId = '6548ffd3e60539c3203bc77b';
    return this.mediaListService.createMediaList(userId);
  }

  @Patch(':id')
  async updateMediaList(
    @Param() params: MongoDbIdDto,
    @Body() body: UpdateMediaListDto,
  ) {
    return this.mediaListService.updateMediaList(params.id, body);
  }

  @Delete(':id')
  async deleteMediaList(@Param() params: MongoDbIdDto) {
    return this.mediaListService.deleteMediaList(params.id);
  }
}

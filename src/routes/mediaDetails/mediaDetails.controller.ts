import { Controller, Get, UseGuards } from '@nestjs/common';
import { MediaDetailsService } from '@/routes/mediaDetails/mediaDetails.service';
import { AuthGuard } from '@/routes/auth/guards/auth.guard';

@Controller('mediaDetails')
export class MediaDetailsController {
  constructor(private readonly mediaDetailsService: MediaDetailsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async createOrUpdateAllMediaDetails() {
    await this.mediaDetailsService.createOrUpdateAllMediaItemsDetails();
  }
}

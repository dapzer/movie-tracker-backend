import { StatusNameEnum, TrackingData } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MediaItemSeriesInfoDto } from '@/routes/mediaItem/dto/mediaItemSeriesInfo.dto';
import { MediaItemSiteToViewDto } from '@/routes/mediaItem/dto/mediaItemSiteToView.dto';
import { Type } from 'class-transformer';

export class MediaItemTrackingDataDto implements TrackingData {
  @IsEnum(StatusNameEnum)
  currentStatus: StatusNameEnum;

  @IsString()
  note: string;

  @IsNumber()
  score: number | null;

  @ValidateNested()
  @Type(() => MediaItemSeriesInfoDto)
  seriesInfo: MediaItemSeriesInfoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaItemSiteToViewDto)
  sitesToView: Array<MediaItemSiteToViewDto>;
}

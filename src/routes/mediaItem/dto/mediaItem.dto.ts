import { MediaItem, MediaTypeEnum } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { MediaItemTrackingDataDto } from '@/routes/mediaItem/dto/mediaItemTrackingDataDto.dto';
import { Type } from 'class-transformer';

export class MediaItemDto implements MediaItem {
  @IsMongoId()
  id: string;

  @IsNumber()
  mediaId: number;

  @IsEnum(MediaTypeEnum)
  mediaType: MediaTypeEnum;

  @IsMongoId()
  mediaListId: string;

  @ValidateNested()
  @Type(() => MediaItemTrackingDataDto)
  trackingData: MediaItemTrackingDataDto;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

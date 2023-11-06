import { MediaTypeEnum } from '@prisma/client';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';

export class CreateMediaItemDto {
  @IsEnum(MediaTypeEnum)
  mediaType: MediaTypeEnum;

  @IsNumber()
  mediaId: number;

  @IsMongoId()
  mediaListId: string;
}

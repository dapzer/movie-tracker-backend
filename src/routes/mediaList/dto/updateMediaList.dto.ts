import { mediaList } from '@prisma/client';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMediaListDto
  implements Pick<mediaList, 'title' | 'isPublic' | 'poster'>
{
  @IsOptional()
  @IsBoolean()
  isPublic: boolean;

  @IsOptional()
  @IsString()
  poster: string;

  @IsOptional()
  @IsString()
  title: string;
}

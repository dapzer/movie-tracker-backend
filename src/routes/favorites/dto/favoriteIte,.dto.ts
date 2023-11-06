import { IsInt, IsString } from 'class-validator';

export class FavoriteIteDto {
  @IsString()
  mediaType: string;

  @IsString()
  id: string;

  @IsInt()
  mediaId: number;
}

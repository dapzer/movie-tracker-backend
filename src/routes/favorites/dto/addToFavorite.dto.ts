import { FavoriteIteDto } from '@/routes/favorites/dto/favoriteIte,.dto';
import { OmitType } from '@nestjs/swagger';

export class AddToFavoriteDto extends OmitType(FavoriteIteDto, [
  'id',
] as const) {}

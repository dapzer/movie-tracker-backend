import { Injectable } from '@nestjs/common';
import { FavoriteIteDto } from '@/routes/favorites/dto/favoriteIte,.dto';
import { AddToFavoriteDto } from '@/routes/favorites/dto/addToFavorite.dto';

@Injectable()
export class FavoritesService {
  getFavoriteItem(): FavoriteIteDto {
    return {
      mediaType: 'movie',
      id: crypto.randomUUID(),
      mediaId: 1,
    };
  }

  getFavoriteItems(): FavoriteIteDto[] {
    return Array(10).fill({
      mediaType: 'movie',
      id: crypto.randomUUID(),
      mediaId: 1,
    });
  }

  addFavorite(favorite: AddToFavoriteDto) {
    return {
      mediaId: favorite.mediaId,
      mediaType: 'movie',
      id: crypto.randomUUID(),
    };
  }
}

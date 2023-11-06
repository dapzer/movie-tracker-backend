import { Body, Controller, Get, Post } from '@nestjs/common';
import { FavoritesService } from '@/routes/favorites/favorites.service';
import { AddToFavoriteDto } from '@/routes/favorites/dto/addToFavorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavoriteItems();
  }

  @Get('/:id')
  getFavoriteItem() {
    return this.favoritesService.getFavoriteItem();
  }

  @Post()
  addFavorite(@Body() body: AddToFavoriteDto) {
    return this.favoritesService.addFavorite(body);
  }
}

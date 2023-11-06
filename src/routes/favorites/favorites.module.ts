import { Module } from '@nestjs/common';
import { FavoritesController } from '@/routes/favorites/favorites.controller';
import { FavoritesService } from '@/routes/favorites/favorites.service';

@Module({
  imports: [],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

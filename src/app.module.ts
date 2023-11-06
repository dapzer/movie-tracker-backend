import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FavoritesModule } from '@/routes/favorites/favorites.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

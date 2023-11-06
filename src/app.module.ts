import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MediaListModule } from '@/routes/mediaList/mediaList.module';
import { MediaItemModule } from '@/routes/mediaItem/mediaItem.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MediaListModule,
    MediaItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MediaListModule } from '@/routes/mediaList/mediaList.module';
import { MediaItemModule } from '@/routes/mediaItem/mediaItem.module';
import { UserModule } from './routes/user/user.module';
import { ProxyModule } from './routes/proxy/proxy.module';
import { PrismaModule } from '@/services/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MediaListModule,
    MediaItemModule,
    UserModule,
    ProxyModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MediaListModule } from '@/routes/mediaList/mediaList.module';
import { MediaListRepositorySymbol } from '@/repositories/mediaList/MediaListRepositoryInterface';
import { PrismaMediaListRepository } from '@/repositories/mediaList/PrismaMediaListRepository';

@Module({
  imports: [MediaListModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: MediaListRepositorySymbol, useClass: PrismaMediaListRepository },
  ],
})
export class UserModule {}

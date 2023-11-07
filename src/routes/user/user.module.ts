import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MediaListModule } from '@/routes/mediaList/mediaList.module';
import { PrismaService } from '@/services/prisma.service';

@Module({
  imports: [MediaListModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}

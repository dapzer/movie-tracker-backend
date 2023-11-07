import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '@/routes/user/user.service';
import { MongoDbIdDto } from '@/shared/dto/mongoDbId.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/mediaList')
  getUserMediaListsById(@Param() params: MongoDbIdDto) {
    return this.userService.getUserMediaListsById(params.id);
  }
}

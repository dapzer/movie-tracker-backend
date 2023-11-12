import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from '@/routes/user/user.service';
import { User } from '@/routes/user/users.decorator';
import { UserDto } from '@/routes/auth/dto/user.dto';
import { MongoDbIdDto } from '@/shared/dto/mongoDbId.dto';
import { AuthGuard } from '@/routes/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@User() user: UserDto) {
    return this.userService.getUser(user?.id);
  }

  @Get(':id')
  async getUserById(@Param() params: MongoDbIdDto) {
    return this.userService.getUser(params.id);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param() params: MongoDbIdDto, @User() user: UserDto) {
    return this.userService.deleteUser(params.id, user?.id);
  }
}

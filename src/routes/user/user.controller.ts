import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { UserService } from '@/routes/user/user.service';
import { User } from '@/routes/user/users.decorator';
import { UserDto } from '@/routes/auth/dto/user.dto';
import { MongoDbIdDto } from '@/shared/dto/mongoDbId.dto';
import { AuthGuard } from '@/routes/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param() params: MongoDbIdDto, @User() user: UserDto) {
    return this.userService.deleteUser(params.id, user?.id);
  }
}

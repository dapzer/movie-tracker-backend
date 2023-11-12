import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  UserRepositoryInterface,
  UserRepositorySymbol,
} from '@/repositories/user/UserRepositoryInterface';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async deleteUser(id: string, currentUserId: string) {
    if (currentUserId !== id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.userRepository.deleteUser(id);
  }
}

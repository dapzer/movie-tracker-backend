import { UserDto } from '@/routes/auth/dto/user.dto';

export const UserRepositorySymbol = Symbol();

export interface UserRepositoryInterface {
  getUserById: (id: string) => Promise<UserDto>;

  createUser: (
    body: Omit<UserDto, 'id' | 'createdAt' | 'updatedAt' | 'userName'>,
  ) => Promise<UserDto>;

  updateUser: (
    id: string,
    body: Partial<Omit<UserDto, 'id' | 'createdAt' | 'updatedAt' | 'email'>>,
  ) => Promise<UserDto>;

  deleteUser: (id: string) => Promise<UserDto>;
}

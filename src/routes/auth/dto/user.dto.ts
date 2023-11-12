import { User } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UserDto implements User {
  @IsMongoId()
  id: string;

  // @IsOptional()
  // @IsString()
  // userName: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsUrl()
  @IsString()
  image: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

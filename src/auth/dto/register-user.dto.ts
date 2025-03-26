import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDefined,
  Matches,
} from 'class-validator';
import { regex } from '../../helpers/regex';

export class RegisterUserDto {
  @IsString()
  @IsDefined({ message: 'Name is required' })
  @IsNotEmpty()
  @Matches(regex.name, {
    message: 'Only latinic letters are allowed from 2 till 25 characters',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(regex.email, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(regex.password, {
    message:
      'Password should be from 8 till 64 symbols and contain at least 1 uppercase letter, 1 number and 1 special symbol from !@#$%^&*',
  })
  password: string;
}

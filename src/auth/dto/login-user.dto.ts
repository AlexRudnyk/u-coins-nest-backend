import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { regex } from '../../helpers/regex';

export class LoginUserDto {
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

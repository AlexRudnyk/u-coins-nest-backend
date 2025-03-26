import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { User } from './schema/user.schema';
import { Types } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body(new ValidationPipe())
    registerUserDto: RegisterUserDto,
  ) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(
    @Body(new ValidationPipe())
    loginUserDto: LoginUserDto,
  ) {
    return this.authService.login(loginUserDto);
  }

  @Get('logout')
  @HttpCode(204)
  logout(@Req() req: Request) {
    const user = req.user as User & { _id: Types.ObjectId };
    return this.authService.logout(user);
  }
}

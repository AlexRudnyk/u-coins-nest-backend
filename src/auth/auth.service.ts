import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password } = registerUserDto;

    const userEmail = await this.userModel.findOne({ email });
    if (userEmail)
      throw new ConflictException(`Email ${email} is already in use`);

    const newUser = new this.userModel(registerUserDto);
    newUser.setPassword(password);
    return await newUser.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{
    accessToken: string;
    user: Pick<User, 'name' | 'role' | 'email'> & {
      _id: Types.ObjectId;
    };
  }> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user || !user.comparePassword(password))
      throw new UnauthorizedException(
        'Email or password is wrong or not registered',
      );

    const payload = { id: user._id };
    const secretKey = process.env.ACCESS_SECRET_KEY;
    if (!secretKey) {
      throw new NotFoundException(
        'ACCESS_SECRET_KEY is not set in environment variables',
      );
    }
    const accessToken = sign(payload, secretKey, {
      expiresIn: '1h',
    });

    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      {
        accessToken,
      },
      { new: true },
    );
    if (!updatedUser)
      throw new NotFoundException(
        `Failed to update user. User ID ${String(user._id)} is not found`,
      );
    const { _id, name, role } = updatedUser;
    return {
      accessToken,
      user: {
        _id: _id as Types.ObjectId,
        name,
        email,
        role,
      },
    };
  }

  async logout(user: User & { _id: Types.ObjectId }): Promise<void> {
    const { _id } = user;
    await this.userModel.findByIdAndUpdate(_id, { accessToken: null });
  }
}

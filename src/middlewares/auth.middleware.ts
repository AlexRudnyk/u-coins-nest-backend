import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schema/user.schema';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    try {
      if (bearer !== 'Bearer') {
        throw new UnauthorizedException('Not authorized');
      }

      const secretKey = process.env.ACCESS_SECRET_KEY;
      if (!secretKey) {
        throw new NotFoundException(
          'ACCESS_SECRET_KEY is not set in environment variables',
        );
      }
      const { id } = verify(token, secretKey) as { id: string };
      const user = await this.userModel.findById(id);
      if (!user || !user.accessToken) {
        throw new UnauthorizedException('Not authorized');
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res
          .status(401)
          .json({ message: 'Token expired. Please log in again.' });
      } else {
        next(error);
      }
    }
  }
}

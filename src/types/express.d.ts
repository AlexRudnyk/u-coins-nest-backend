import { UserDocument } from 'src/users/schemas/users.schema';

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument;
    }
  }
}

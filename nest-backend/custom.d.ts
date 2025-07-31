import { UserPayload } from 'src/types/jwt.type';

declare global {
  namespace Express {
    export interface Request {
      user: UserPayload;
    }
  }
}

import { UserPayload } from 'src/types/jwt.type';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}

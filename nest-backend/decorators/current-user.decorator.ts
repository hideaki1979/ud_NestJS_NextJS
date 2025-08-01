import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  if (!request.user) {
    throw new Error('User not found in request');
  }
  return request.user;
});

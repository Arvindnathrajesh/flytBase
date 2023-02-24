import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequest } from 'src/packages/types/dtos/user';

export const User = createParamDecorator(
  (data: any, ctx: ExecutionContext): UserRequest => {
    const req: UserRequest = ctx.switchToHttp().getRequest();
    if (!!req.user) {
      return !!data ? req.user[data] : req.user;
    }
  },
);
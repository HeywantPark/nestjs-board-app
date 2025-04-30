import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

interface AuthenticatedRequest extends Request {
  user: User; // user 속성 추가
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return req.user;
  },
);

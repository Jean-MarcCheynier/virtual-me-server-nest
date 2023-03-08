import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as LocalUser } from 'src/user/schema/user.schema';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as LocalUser;
  },
);

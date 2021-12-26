import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ExpressRequestInterface } from '@app/types/expres-request.interface';

export const User = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

  if (!request.user) {
    return null;
  }

  if (key) {
    return request.user[key];
  }

  return request.user;
});

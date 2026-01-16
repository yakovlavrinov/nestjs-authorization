import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { User } from 'generated/prisma/client';

type RequestWithUser = Request & {
  user?: User;
};

export const Authorized = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    const { user } = request;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);

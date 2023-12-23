import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressRequestInterface } from '../../types/express-request.interface';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    req.user = null;

    this.userService.createUser({ login: 'lo', password: '12323' });

    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const { id } = verify(token, this.configService.get('JWT_SECRET')) as {
          id: number;
        };

        req.user = await this.userService.findById(id);
      } catch (e) {
        req.user = null;
      }
    }

    next();
  }
}

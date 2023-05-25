import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JWT_SECRET } from '../../config/config';
import { ExpressRequestInterface } from '../../types/expres-request.interface';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddelware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    req.user = null;

    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const { id } = verify(token, JWT_SECRET) as { id: number };

        req.user = await this.userService.findById(id);
      } catch (e) {
        req.user = null;
      }
    }

    next();
  }
}

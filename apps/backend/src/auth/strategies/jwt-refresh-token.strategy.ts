import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '../../config/config.service';
import { UserService } from '../../user/user.service';
import TokenPayloadInterface from '../types/tokenPayload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Refresh,
      ]),
      secretOrKey: configService.app.jwtRefreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayloadInterface) {
    const refreshToken = request.cookies?.Refresh;

    return this.userService.getUserIfRefreshTokenValid(
      refreshToken,
      payload.userId,
    );
  }
}

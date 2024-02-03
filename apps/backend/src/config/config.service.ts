import { Injectable } from '@nestjs/common';
import { ConfigService as BaseConfigService } from '@nestjs/config';
import { AppConfigInterface, EnvironmentVariablesInterface } from './types';

@Injectable()
export class ConfigService {
  public readonly app: AppConfigInterface;

  constructor(conf: BaseConfigService<EnvironmentVariablesInterface, true>) {
    this.app = {
      databaseUrl: conf.get('DATABASE_URL', { infer: true }),
      port: conf.get('BACKEND_PORT', { infer: true }),
      jwtAccessTokenExpirationTime: conf.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        { infer: true },
      ),
      jwtAccessTokenSecret: conf.get('JWT_ACCESS_TOKEN_SECRET', {
        infer: true,
      }),
      jwtRefreshTokenExpirationTime: conf.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        { infer: true },
      ),
      jwtRefreshTokenSecret: conf.get('JWT_REFRESH_TOKEN_SECRET', {
        infer: true,
      }),
    };
  }
}

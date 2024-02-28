import { Injectable } from '@nestjs/common';
import { ConfigService as BaseConfigService } from '@nestjs/config';
import { AppConfigInterface, EnvironmentVariablesInterface } from './types';

@Injectable()
export class ConfigService {
  public readonly app: AppConfigInterface;

  constructor(conf: BaseConfigService<EnvironmentVariablesInterface, true>) {
    this.app = {
      jwtSecret: conf.get('JWT_SECRET', { infer: true }),
      databaseUrl: conf.get('DATABASE_URL', { infer: true }),
      port: conf.get('BACKEND_PORT', { infer: true }),
    };
  }
}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthMiddelware } from './user/middelware/auth.middelware';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddelware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

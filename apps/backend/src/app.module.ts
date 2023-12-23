import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthMiddleware } from './user/middleware/auth.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddelware } from '@app/user/middelware/auth.middelware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import ormconfig from '@app/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddelware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

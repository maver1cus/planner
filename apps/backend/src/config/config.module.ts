import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfgigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { validationSchema } from './validationSchema';

@Module({
  imports: [
    BaseConfgigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

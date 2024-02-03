import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PrismaModule, ConfigModule, AuthModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}

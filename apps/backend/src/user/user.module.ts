import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

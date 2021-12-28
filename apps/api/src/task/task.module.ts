import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskEntity } from '@app/task/entities/task.entity';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

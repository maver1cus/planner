import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseInterface } from '@app/task/types/task-response.inteface';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createTaskDto: CreateTaskDto,
    @User() currentUser: UserEntity,
  ) {
    return this.taskService.create(createTaskDto, currentUser);
  }

  @Get()
  async findAll(
    @User('id') currentUserId: number,
  ): Promise<TaskResponseInterface[]> {
    const tasks = await this.taskService.findAll(currentUserId);

    return this.taskService.buildTasksResponse(tasks);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}

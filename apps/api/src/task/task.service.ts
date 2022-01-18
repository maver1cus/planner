import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from '@app/task/task.entity';
import { TaskResponseInterface } from '@app/task/types/task-response.inteface';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task = new TaskEntity();
    Object.assign(task, createTaskDto);
    task.author = user;

    return await this.taskRepository.save(task);
  }

  buildTasksResponse(tasks: TaskEntity[]): TaskResponseInterface[] {
    return tasks
      .reduce((acc, task) => {
        const children = tasks.filter((item) => item.parentId == task.id);
        acc.push({ ...task, children });
        return acc;
      }, [])
      .filter((task) => task.parentId === 0);
  }

  async findAll(userId: number): Promise<TaskEntity[]> {
    return await this.taskRepository.find({
      where: { author: { id: userId } },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task ${updateTaskDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

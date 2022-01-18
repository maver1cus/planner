import { TaskType } from '@app/task/task.entity';

export class CreateTaskDto {
  readonly title: string;
  readonly dateStart?: Date;
  readonly done: boolean;
  readonly type: TaskType;
  readonly parentId: number;
}

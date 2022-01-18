import { TaskEntity } from '@app/task/task.entity';

export interface TaskResponseInterface {
  task: TaskEntity & { children: TaskResponseInterface[] };
}

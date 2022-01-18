import { TaskEntity } from '@app/task/task.entity';

export type TaskType = Omit<TaskEntity, 'author'>;

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { UserEntity } from '@app/user/user.entity';

export enum TaskType {
  PROJECT = 'project',
  TASK = 'task',
  FOLDER = 'folder',
}

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  dateStart: Date;

  @Column({ type: 'boolean' })
  done: boolean;

  @Column({
    type: 'enum',
    enum: TaskType,
    default: 'task',
  })
  type: TaskType;

  @Column()
  parentId: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { eager: true })
  author: UserEntity;
}

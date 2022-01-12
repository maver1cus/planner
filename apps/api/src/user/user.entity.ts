import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from '@app/task/task.entity';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ example: 'login', description: 'Логин пользователя' })
  login: string;

  @Column({ select: false })
  @ApiProperty({ example: '123', description: 'Пароль пользователя' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => TaskEntity, (task) => task.author)
  tasks: TaskEntity[];
}

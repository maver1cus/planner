import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import {ApiProperty} from "@nestjs/swagger";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'login', description: 'Логин пользователя'})
  @Column()
  login: string;

  @ApiProperty({example: '123', description: 'Пароль пользователя'})
  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

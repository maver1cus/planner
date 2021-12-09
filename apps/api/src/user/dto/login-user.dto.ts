import { IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '123',
    description: 'Логиг пользователя'
  })
  readonly login: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '123',
    description: 'Пароль пользователя'
  })
  readonly password: string;
}

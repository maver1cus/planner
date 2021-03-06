import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '123',
    description: 'Логин пользователя',
  })
  readonly login: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '123',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}

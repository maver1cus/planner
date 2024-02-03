import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'test',
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

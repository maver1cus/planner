import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: number;
  login: string;

  @Exclude()
  password: string;
}

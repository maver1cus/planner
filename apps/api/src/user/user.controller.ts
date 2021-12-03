import {Body, Controller, Post} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import {LoginUserDto} from "@app/user/dto/login-user.dto";
import {UserResponseInterface} from "@app/user/types/user-response.interface";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body('user') loginUserDto: LoginUserDto
  ): Promise<any> {
    const user = await this.userService.login(loginUserDto);

    return this.userService.buildUserResponse(user);
  }
}

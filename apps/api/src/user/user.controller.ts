import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { UserResponseInterface } from '@app/user/types/user-response.interface';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import {AuthGuard} from "@app/user/guards/auth.guard";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);

    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.login(loginUserDto);

    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getCurrentUser(@User() user: UserEntity) {
    return this.userService.buildUserResponse(user);
  }
}

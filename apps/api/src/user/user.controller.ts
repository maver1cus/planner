import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { UserResponseInterface } from '@app/user/types/user-response.interface';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import {AuthGuard} from "@app/user/guards/auth.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {ResponseUserDto} from "@app/user/dto/response-user.dto";

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({
    status: 200,
    type: ResponseUserDto,
    description: 'Пользователь создан'
  })
  @Post('registration')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);

    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({summary: 'Логин'})
  @ApiResponse({
    status: 200,
    type: ResponseUserDto,
  })
  @ApiBody({ type: LoginUserDto})
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.login(loginUserDto);

    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiBearerAuth('token')
  async getCurrentUser(@User() user: UserEntity) {
    return this.userService.buildUserResponse(user);
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { User } from './decorators/user.decorator';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInterface } from './types/user-response.interface';
import { UserService } from './user.service';

@Controller()
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  @ApiBody({ type: UserDto })
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({
    status: 200,
    type: ResponseUserDto,
    description: 'Пользователь создан',
  })
  async createUser(@Body() userDto: UserDto): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(userDto);

    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @ApiBody({ type: UserDto })
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Логин' })
  @ApiResponse({
    status: 200,
    type: ResponseUserDto,
  })
  async login(@Body() userDto: UserDto): Promise<any> {
    const user = await this.userService.login(userDto);

    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  async getCurrentUser(@User() user: UserModel) {
    return this.userService.buildUserResponse(user);
  }
}

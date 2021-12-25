import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { ResponseUserDto } from '@app/user/dto/response-user.dto';
import { User } from '@app/user/decorators/user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { UserEntity } from '@app/user/user.entity';
import { UserResponseInterface } from '@app/user/types/user-response.interface';
import { UserService } from '@app/user/user.service';
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({
    status: 200,
    type: ResponseUserDto,
    description: 'Пользователь создан',
  })
  @Post('registration')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: UserDto })
  async createUser(@Body() userDto: UserDto): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(userDto);

    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Логин' })
  @ApiResponse({
    status: 200,
    type: ResponseUserDto,
  })
  @ApiBody({ type: UserDto })
  async login(@Body() userDto: UserDto): Promise<any> {
    const user = await this.userService.login(userDto);

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

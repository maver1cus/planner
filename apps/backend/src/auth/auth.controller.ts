import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUserInterface from './types/request-with-user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RegistrationDto,
    description: 'Регистрация пользователя',
  })
  @Post('register')
  async register(@Body() registrationData: RegistrationDto) {
    return this.authService.registration(registrationData);
  }

  @ApiBody({ type: UserResponseDto })
  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiResponse({
    status: 200,
    type: LoginDto,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUserInterface) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);
    await this.userService.setRefreshToken(refreshToken, user.id);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req() request: RequestWithUserInterface,
    @Res() response: Response,
  ) {
    await this.userService.removerRefreshToken(request.user.id);
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    return response.sendStatus(HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  auth(@Req() request: RequestWithUserInterface) {
    return request.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUserInterface) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}

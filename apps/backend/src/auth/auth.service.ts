import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { ConfigService } from '../config/config.service';
import { PrismaError } from '../prisma/prismaError.enum';
import { UserService } from '../user/user.service';
import { RegistrationDto } from './dto/registration.dto';
import TokenPayloadInterface from './types/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(registrationData: RegistrationDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });

      createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error?.code === PrismaError.UniqueConstraintFailed
      ) {
        throw new HttpException(
          'User with that login already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getCookieWithJwtAccessToken(userId: number): string {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.app.jwtAccessTokenSecret,
      expiresIn: `${this.configService.app.jwtAccessTokenExpirationTime}s`,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.app.jwtAccessTokenExpirationTime}`;
  }

  getCookieWithJwtRefreshToken(userId) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.app.jwtRefreshTokenSecret,
      expiresIn: `${this.configService.app.jwtRefreshTokenExpirationTime}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.app.jwtAccessTokenExpirationTime}`;

    return { cookie, token };
  }

  getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  async getAuthenticatedUser(login: string, password: string) {
    try {
      const user = await this.userService.getByLogin(login);
      await this.verifyPassword(password, user.password);

      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);

    if (!isCorrectPassword) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }
}

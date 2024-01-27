import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ConfigService } from '../config/config.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { TUserPrismaService } from './types/user-prisma-service.type';
import { UserResponseInterface } from './types/user-response.interface';

@Injectable()
export class UserService {
  private readonly prisma: TUserPrismaService;

  constructor(
    prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.prisma = prisma;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const userByLogin = this.prismaService.user.findUnique({
      where: {
        login: userDto.login,
      },
    });

    if (userByLogin) {
      throw new HttpException(
        'Login are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userDto.password, salt);

    return this.prisma.user.create({
      data: { ...userDto, password: hashPassword },
    });
  }

  async login(userDto: UserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        login: userDto.login,
      },
    });

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;

    return user;
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        login: user.login,
      },
      this.configService.app.jwtSecret,
    );
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      id: user.id,
      login: user.login,
      token: this.generateJwt(user),
    };
  }
}

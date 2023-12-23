import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { JWT_SECRET } from '../config/config';
import { UserDto } from './dto/user.dto';
import { TUserPrismaService } from './types/user-prisma-service.type';
import { UserResponseInterface } from './types/user-response.interface';

@Injectable()
export class UserService {
  private readonly prisma: TUserPrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async createUser(userDto: Prisma.UserCreateInput): Promise<User> {
    const userByLogin = await this.prisma.user.findUnique({
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

    return await this.prisma.user.create({
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
    const userLogin = Prisma.validator<Prisma.UserSelect>()({
      login: true,
      id: true,
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: userLogin,
    });

    console.log(user);

    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        login: user.login,
      },
      JWT_SECRET,
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

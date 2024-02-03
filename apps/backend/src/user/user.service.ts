import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { TUserPrismaService } from './types/user-prisma-service.type';

@Injectable()
export class UserService {
  private readonly userPrismaService: TUserPrismaService;

  constructor(private readonly prismaService: PrismaService) {
    this.userPrismaService = prismaService;
    this.prismaService = prismaService;
  }

  async getByLogin(login: string) {
    const user = await this.userPrismaService.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async getById(id: number): Promise<User> {
    const user = await this.userPrismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return this.userPrismaService.user.create({
      data: { ...userDto },
    });
  }

  async setRefreshToken(refreshToken: string, userId: number) {
    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { refreshToken: hashRefreshToken },
    });
  }

  async getUserIfRefreshTokenValid(refreshToken: string, userId: number) {
    const user = await this.getById(userId);
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenValid) {
      return user;
    }
  }

  async removerRefreshToken(userId: number) {
    return this.userPrismaService.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}

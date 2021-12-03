import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '@app/user/user.entity';
import {Repository} from 'typeorm';
import {LoginUserDto} from "@app/user/dto/login-user.dto";
import {UserResponseInterface} from "@app/user/types/user-response.interface";
import {sign} from "jsonwebtoken";
import {JWT_SECRET} from "@app/config";
import {compare} from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      login: loginUserDto.login
    }, {
      select: ['id', 'login', 'password']
    });

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password
    )

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    delete user.password;

    return user;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        login: user.login
      },
      JWT_SECRET
    )
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      },
    }
  }
}

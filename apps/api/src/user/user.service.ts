import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWT_SECRET } from '@app/config';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '@app/user/user.entity';
import { UserResponseInterface } from './types/user-response.interface';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: UserDto): Promise<UserEntity> {
    const userByLogin = await this.userRepository.findOne({
      login: userDto.login,
    });

    if (userByLogin) {
      throw new HttpException(
        'Login are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, userDto);

    return await this.userRepository.save(newUser);
  }

  async login(userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        login: userDto.login,
      },
      {
        select: ['id', 'login', 'password'],
      },
    );

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(userDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;

    return user;
  }

  findById(id: any) {
    return this.userRepository.findOne(id);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        login: user.login,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      id: user.id,
      login: user.login,
      token: this.generateJwt(user),
    };
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JwtBlacklistEntity } from './jwtBlacklist.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(JwtBlacklistEntity)
    private readonly jwtRepository: Repository<JwtBlacklistEntity>,
    private jwtService: JwtService,
  ) {}

  async register(userBody: any) {
    const { firstname, lastname, mail, password } = userBody;

    const userAlreadyExist = await this.userRepository.findOne({
      where: {
        mail,
      },
    });
    if (userAlreadyExist) throw new HttpException('User already exists', 400);

    const user = this.userRepository.create({
      firstname,
      lastname,
      mail,
      password,
    });

    const savedUser = await this.userRepository.save(user);

    const payload = {
      id: savedUser.id,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
    };

    return await this.jwtService.signAsync(payload);
  }

  async login(userBody: any) {
    const { mail, password } = userBody;
    const user = await this.userRepository.findOne({
      where: {
        mail,
        provider: 'local'
      },
    });
    if (!user) throw new HttpException('User not found', 404);

    if (user.password !== password) throw new HttpException('Passwords do not match', 400);

    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    return await this.jwtService.signAsync(payload);
  }

  async logout(req: any, response: Response) {
    response.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    const jwt = this.jwtRepository.create({
      jwt: req.cookies['token']
    });
    await this.jwtRepository.save(jwt);
  }
}

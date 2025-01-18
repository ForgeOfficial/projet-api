import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async register(userBody: any) {
    const { firstname, lastname, mail, password } = userBody;

    const userAlreadyExist = await this.userRepository.findOne({
      where: {
        mail,
      },
    });
    if (userAlreadyExist) throw new Error('User already exists');

    const user = this.userRepository.create({
      firstname,
      lastname,
      mail,
      password,
    });
    return this.userRepository.save(user);
  }

  async login(userBody: any) {
    const { mail, password } = userBody;
    const user = await this.userRepository.findOne({
      where: {
        mail,
      },
    });
    if (!user) throw new Error('User not found');

    if (user.password !== password) throw new Error('Passwords do not match');

    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    };
    return await this.jwtService.signAsync(payload);
  }
}

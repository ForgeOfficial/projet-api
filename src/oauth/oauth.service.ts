import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OauthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async register(userBody: any) {
    let userAlreadyExist = await this.userRepository.findOne({
      where: {
        provider: userBody.provider,
        password: userBody.password,
      },
    });
    if (!userAlreadyExist) {
      console.log('registering user');
      const user = this.userRepository.create({
        firstname: userBody.firstname,
        password: userBody.password,
        provider: userBody.provider,
      });
      userAlreadyExist = await this.userRepository.save(user);
    }

    const payload = {
      id: userAlreadyExist.id,
      firstname: userAlreadyExist.firstname,
    };
    return await this.jwtService.signAsync(payload);
  }
}

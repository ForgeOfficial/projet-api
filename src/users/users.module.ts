import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { OAuthModule } from '../oauth/oauth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), OAuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

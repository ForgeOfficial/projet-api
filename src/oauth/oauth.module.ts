import { Module } from '@nestjs/common';
import { GithubStrategy } from './github.strategy';
import { OAuthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { UsersEntity } from '../users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [OAuthController],
  providers: [OauthService, GithubStrategy, GoogleStrategy],
})
export class OAuthModule {}

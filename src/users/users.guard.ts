import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtBlacklistEntity } from './jwtBlacklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(JwtBlacklistEntity)
    private readonly jwtRepository: Repository<JwtBlacklistEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token)
      throw new UnauthorizedException();

    const jwtBlacklist = await this.jwtRepository.findOne({
      where: {
        jwt: token
      }
    });
    if (jwtBlacklist)
      throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const token = request.cookies?.token;
    return token || undefined;
  }
}

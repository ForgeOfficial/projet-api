import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UsersGuard } from './users.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userBody: any, @Res() response: Response) {
    const accessToken = await this.usersService.register(userBody);
    response.cookie('token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 60 * 1000,
    });
    return response.send(accessToken);
  }

  @Post('login')
  async login(@Body() userBody: any, @Res() response: Response) {
    const accessToken = await this.usersService.login(userBody);
    response.cookie('token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 60 * 1000,
    });
    return response.send(accessToken);
  }

  @Get()
  @UseGuards(UsersGuard)
  getUser(@Request() req: any) {
    return {
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
    };
  }

  @Post('logout')
  @UseGuards(UsersGuard)
  async logout(@Request() req: any, @Res() response: Response) {
    await this.usersService.logout(req, response);
    return response.send({ message: 'Successfully logged out' });
  }
}

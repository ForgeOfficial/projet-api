import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OauthService } from './oauth.service';
import { Response } from 'express';

@Controller('auth')
export class OAuthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() response: Response) {
    const accessToken = await this.oauthService.register(req.user);
    response.cookie('token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000,
    });
    return response.send(accessToken);
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterAuth() {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req: any, @Res() response: Response) {
    const accessToken = await this.oauthService.register(req.user);
    response.cookie('token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000,
    });
    return response.send(accessToken);
  }
}

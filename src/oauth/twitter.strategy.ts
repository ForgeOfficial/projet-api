import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'oob',
    });
  }

  async validate(
    token: string,
    tokenSecret: string,
    profile: any,
    done: any,
  ): Promise<any> {
    console.log(profile);
    done(null, {});
  }
}

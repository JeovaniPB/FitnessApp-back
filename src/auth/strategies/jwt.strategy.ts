import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET! || '4a0d93fead03227849de7451c15c4809e7dbaebfb0d6e82ea7a6ee1af48e66f0',
    });
  }
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}

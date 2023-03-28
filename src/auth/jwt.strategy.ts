import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('authConfig.secret_key'),
    });
  }

  async validate(payload: any) {
    return {
      email: payload.email,
      username: payload.username,
      userId: payload.sub,
      roles: payload.roles,
      isCreatable: payload.isCreatable,
    };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    username: string,
    password: string,
    request: Request,
  ): Promise<any> {
    const contexId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contexId);
    const user = await this.authService.validateuser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

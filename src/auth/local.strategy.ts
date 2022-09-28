import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

export interface UserInfo {
  userId?: string;
  username: string;
  password?: string;
  roles?: string[];
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateuser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

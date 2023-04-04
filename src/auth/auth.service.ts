import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment-timezone';
import { Role } from 'src/enum/roles.enum';
import { SignUpUserDto } from 'src/user/dto';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

moment.tz.setDefault('Asia/Bangkok');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateuser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      email: user.email,
      roles: user.roles,
      isCreateAble: user.isCreateAble,
    }; //Declare fields return from User class then return to validate method in jwt strategy
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
    const decode = this.jwtService.verify(accessToken, {
      secret: process.env.SECRET_KEY,
    });
    return {
      accessToken: accessToken,
      // expiredAt: moment.unix(decode.exp).format('YYYY-MM-DD HH:mm:ss'),
      expiredAt: decode.exp,
    };
  }

  async signup(userSignUp: SignUpUserDto) {
    const user = {
      ...userSignUp,
      roles: [Role.Author],
      isCreateAble: true,
      isActive: true,
    };
    return this.userService.createUser(user);
  }

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    const userDto = await this.userService.findOne(user.username);
    if (userDto && userDto.password === changePasswordDto.currentPassword) {
      userDto.password = changePasswordDto.newPassword;
    }
    return this.userService.changePassword(userDto._id, userDto);
  }
}

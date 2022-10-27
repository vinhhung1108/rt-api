import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

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
      sub: user.email,
      _id: user._id,
      roles: user.roles,
      isCreatable: user.isCreatable,
    }; //Declare fields return from User class then return to validate method in jwt strategy
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: CreateUserDto) {
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

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateuser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.email, id: user._id }; //Declare fields return from User class
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

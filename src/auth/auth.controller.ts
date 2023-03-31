import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { SignUpUserDto } from 'src/user/dto';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signup(signUpUserDto);
  }

  // @UseGuards(JwtAuthGuard) //using Jwt global
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @UseGuards(JwtAuthGuard) //using jwt global
  @Patch('change-password')
  async changePassword(
    @Request() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(req.user, changePasswordDto);
  }
}

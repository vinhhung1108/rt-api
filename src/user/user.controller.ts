import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/custom.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //@Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}

import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}

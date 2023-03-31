import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorator/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(
    // @Query('q') keyword?: string,
    @Query('_limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('_page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ): Observable<User[]> {
    return this.userService.findAll(page, limit);
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}

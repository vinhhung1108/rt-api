import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { CreateUserDto } from './dto';
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
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    return this.userService.update(id, updateUserDto, req.user);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }

  @Roles(Role.Admin)
  @Post('create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}

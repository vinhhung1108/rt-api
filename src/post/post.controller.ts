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
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { Post as BlogPost } from './schemas/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @Roles(Role.Mod, Role.Admin, Role.User)
  create(@Request() req: any, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto, req.user);
  }

  @Public()
  @Get()
  findAll(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    // @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ): Observable<BlogPost[]> {
    return this.postService.findAll(page, limit, keyword);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  // @Delete()
  // removeAll(@Body() confirm: { value: string }) {
  //   return this.postService.deleteAll(confirm);
  // }
}

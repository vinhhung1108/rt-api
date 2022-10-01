import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto, user: any): Promise<Post> {
    const lastPost = await this.lastPost();
    const postId = lastPost ? ++lastPost.postId : 1;
    const newPost = { ...createPostDto, postId: postId, createdBy: user.id };
    return await this.postModel.create(newPost);
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post | undefined> {
    return await this.postModel.findOne({ _id: id });
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    user: any,
  ): Promise<Post | undefined> {
    const updatePost = { ...updatePostDto, updatedBy: user.id };
    return await this.postModel
      .findOneAndUpdate({ _id: id }, updatePost, {
        returnOriginal: false,
      })
      .exec();
  }

  async remove(id: string): Promise<Post | undefined> {
    return await this.postModel.findOneAndDelete({ _id: id });
  }

  async lastPost(): Promise<Post | undefined> {
    return await this.postModel
      .findOne()
      .sort({ field: 'asc', _id: -1 })
      .limit(1)
      .exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { ProvinceService } from 'src/province/province.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private provinceService: ProvinceService,
  ) {}

  async create(req: CreatePostDto, user: any): Promise<Post> {
    const lastPost = await this.lastPost();
    const postId = lastPost ? ++lastPost.postId : 1;
    const addressText = req.address
      ? await this.provinceService.getTextAddress(
          req.address.provinceId,
          req.address.districtId,
          req.address.wardId,
        )
      : undefined;
    const addressWithText = req.address
      ? { ...req.address, text: addressText }
      : {};
    const newPost = {
      ...req,
      postId: postId,
      createdBy: user.id,
      address: addressWithText,
      // address: address,
    };
    return await this.postModel.create(newPost);
  }

  findAll(keyword?: string, limit = 10, skip = 0): Observable<Post[]> {
    if (keyword) {
      return from(
        this.postModel
          .find({
            $or: [
              { title: { $regex: '.*' + keyword + '*' } },
              { content: { $regex: '.*' + keyword + '*' } },
            ],
          })
          .skip(skip)
          .limit(limit)
          .exec(),
      );
    } else {
      return from(this.postModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  async findOne(id: string): Promise<Post | undefined> {
    const post = await this.postModel.findOne({ _id: id });
    return post;
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

  async deleteAll(): Promise<any> {
    return await this.postModel.deleteMany({}).exec();
  }

  //action for comments
  //...
}

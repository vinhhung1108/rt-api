import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/enum/action.enum';
import { ProvinceService } from 'src/province/province.service';
import { User } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private provinceService: ProvinceService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create(
    req: CreatePostDto,
    user: User,
  ): Promise<Post | { message: string }> {
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Create, Post)) {
      return { message: 'You cannot create Post' };
    }
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
      createdBy: user._id,
      address: addressWithText,
      // address: address,
    };
    return await this.postModel.create(newPost);
  }

  findAll(page = 1, limit = 10, keyword?: string): Observable<Post[]> {
    const skip = limit * (page - 1);
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

  // async deleteAll(confirm: { value: string }): Promise<any> {
  //   if (confirm.value === 'dell') {
  //     return await this.postModel.deleteMany({}).exec();
  //   }
  // }

  //action for comments
  //...
}

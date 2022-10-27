import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

export type Users = any;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<Users | undefined> {
    const user = await this.userModel.findOne({ username: username });
    return user.toObject(); /** mongoose to object normal */
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const lastUser = await this.lastUser();
    const userId = lastUser ? ++lastUser.userId : 1;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    const user = { ...createUserDto, userId: userId, password: password };
    return await this.userModel.create(user);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id }, user, {
      returnOriginal: false,
    });
  }

  async deleteOne(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ _id: id });
  }

  async changePassword(id: string, user: ChangePasswordDto): Promise<User> {
    // const id = user.id;
    return await this.userModel.findOneAndUpdate({ _id: id }, user, {
      returnOriginal: false,
    });
  }

  async lastUser(): Promise<User | undefined> {
    return await this.userModel
      .findOne()
      .sort({ field: 'asc', _id: -1 })
      .limit(1)
      .exec();
  }
}

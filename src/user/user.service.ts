import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

export type Users = any;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<Users | undefined> {
    const user = await this.userModel.findOne({ username: username }).exec();
    return user.toObject(); /** mongoose to object normal */
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id, user });
  }

  async deleteOne(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}

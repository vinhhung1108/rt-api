import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Error, Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/enum/action.enum';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

export type Users = any;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async findOne(id: string): Promise<Users | undefined> {
    const user = await this.userModel.findOne({ _id: id });

    return user.toObject(); /** mongoose to object normal */
  }

  findAll(page = 1, limit = 10): Observable<User[]> {
    const skip = limit * (page - 1);
    return from(this.userModel.find({}).skip(skip).limit(limit).exec());
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<User | Error | { message: string }> {
    try {
      const lastUser = await this.lastUser();
      const userId = lastUser ? ++lastUser.userId : 1;
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(createUserDto.password, salt);
      const user = { ...createUserDto, userId: userId, password: password };
      return await this.userModel.create(user);
    } catch (error) {
      if (error.code === 11000) {
        const keys = Object.keys(error.keyValue).join();
        throw new HttpException(
          `The "${keys}" already exists!`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw error;
      }
    }
  }

  async update(
    id: string,
    userInfo: UpdateUserDto,
    currentUser: User,
  ): Promise<User | Error | { message: string }> {
    const ability = this.caslAbilityFactory.createForUser(currentUser);
    if (!ability.can(Action.Update, User)) {
      return { message: "You don't have permission to do that!" };
    }
    try {
      const { password: reqPassword, ...userUpdate } = userInfo;
      const salt = await bcrypt.genSalt();
      const passwordHash = reqPassword
        ? await bcrypt.hash(reqPassword, salt)
        : null;
      const userUpdateDto = passwordHash
        ? { ...userUpdate, password: passwordHash }
        : { ...userUpdate };
      return await this.userModel.findOneAndUpdate({ _id: id }, userUpdateDto, {
        returnOriginal: false,
      });
    } catch (error) {
      if (error.code === 11000) {
        const keys = Object.keys(error.keyValue).join();
        throw new HttpException(
          `The "${keys}" already exists!`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw error;
      }
    }
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

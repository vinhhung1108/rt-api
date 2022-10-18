import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create(createRoleDto);
  }

  async getAllRole(): Promise<Role[]> {
    return this.roleModel.find({}).exec();
  }

  async getRoleById(id: string): Promise<Role> {
    return this.roleModel.findById(id).exec();
  }

  async getByName(roleName: string): Promise<Role> {
    return this.roleModel.findOne({ name: roleName }).exec();
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleModel
      .findOneAndUpdate({ _id: id }, updateRoleDto, {
        returnOriginal: false,
      })
      .exec();
  }

  async removeRole(id: string): Promise<Role> {
    return this.roleModel.remove({ _id: id }).exec();
  }
}

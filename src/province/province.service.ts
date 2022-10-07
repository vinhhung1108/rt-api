import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { District } from './schemas/district.schema';
import { Province, ProvinceDocument } from './schemas/province.schema';
import { Ward } from './schemas/ward.schema';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectModel(Province.name) private provinceModel: Model<ProvinceDocument>,
  ) {}

  // async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
  //   return await this.provinceModel.create(createProvinceDto);
  // }

  async findAll(): Promise<Province[]> {
    return await this.provinceModel.find().exec();
  }

  async findOne(id: string): Promise<Province | undefined> {
    return await this.provinceModel.findOne({ _id: id });
  }

  async update(
    id: number,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    return await this.provinceModel.findOneAndUpdate(
      { _id: id },
      updateProvinceDto,
      { returnOriginal: false },
    );
  }

  // async remove(id: string) {
  //   return await this.provinceModel.findOneAndDelete({ _id: id });
  // }

  async getTextAddress(
    provinceId: string | undefined,
    districtId: number | undefined,
    wardId: number | undefined,
  ): Promise<string | undefined> {
    let address = '';
    if (provinceId != undefined) {
      const province = await this.findOne(provinceId);
      address = province ? address + province.name : address;
      if (province && districtId >= 0) {
        const district = province.districts[districtId];
        address = district ? address + '/' + district.name : address;
        if (district && wardId >= 0) {
          const ward = district.wards[wardId];
          address = ward ? address + '/' + ward.name : address;
        }
      }
    }
    return address;
  }

  async getDistrict(provinceId: string, districtId: number): Promise<District> {
    const province = await this.findOne(provinceId);
    if (province) {
      return province.districts[districtId];
    }
    return null;
  }

  async getWard(
    provinceId: string,
    districtId: number,
    wardId: number,
  ): Promise<Ward> {
    const district = await this.getDistrict(provinceId, districtId);
    if (district) {
      return district.wards[wardId];
    }
    return null;
  }
}

import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  // @Post()
  // create(@Body() createProvinceDto: CreateProvinceDto) {
  //   return this.provinceService.create(createProvinceDto);
  // }

  @Public()
  @Get()
  findAll() {
    return this.provinceService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.provinceService.update(+id, updateProvinceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.provinceService.remove(id);
  // }
}

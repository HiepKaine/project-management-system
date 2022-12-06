import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCollectionResponse, ApiItemResponse, ApiResponseService, ApiSuccessResponse } from '@server/common';
import { Slider } from './slider.entity';
import { SliderService } from './slider.service';
import { SliderTransformer } from './slider.transformer';
import { CreateSliderDto, UpdateSliderDto } from './types';

@Controller('slider')
@ApiTags('slider')
export class SliderController {
  constructor(private respone: ApiResponseService, private sliderService: SliderService) { }
  @Get(':name')
  async show(@Param('name') name: string ): Promise<ApiCollectionResponse<Slider>> {
    const result = await this.sliderService.repository.find({
      where: {
        name: name,
      }
    })
    return this.respone.collection(result, SliderTransformer)
  }

  @Post()
  async create(@Body() data: CreateSliderDto): Promise<ApiItemResponse<Slider>> {
    const result = await this.sliderService.create(data);
    return this.respone.item(result, SliderTransformer)
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) sliderId: number, @Body() data: UpdateSliderDto): Promise<ApiItemResponse<Slider>> {
    const result = await this.sliderService.update(sliderId, data);
    return this.respone.item(result, SliderTransformer)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) sliderId: number): Promise<ApiSuccessResponse> {
    await this.sliderService.destroy(sliderId);
    return this.respone.success();
  }
}


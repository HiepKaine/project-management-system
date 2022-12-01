import slugify from 'slugify';
import { FindManyQueryParam } from './../@core/types';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Post,
  Put,
  Query
} from '@nestjs/common';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth
} from '@server/common';

import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryTransformer } from './category.transformer';
import {
  CreateCategoryDto,
  UpdateCategoryDto
} from './types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/category')
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private response: ApiResponseService, private categoryService: CategoryService) { }
  @Get()
  @Auth('admin')
  async index(@Query() param: FindManyQueryParam): Promise<ApiPaginateResponse<Category>> {
    const page = param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit = param.limit && Number(param.limit) > 0 ? Math.floor(Number(param.limit)) : 20;
    let query;
    if (param.keyword) {
      query = await this.categoryService.repository.createQueryBuilder()
        .where(`name LIKE :searchPattern`, { searchPattern: `%${param.keyword}%` })
        .orderBy('id', 'DESC');
    } else {
      query = await this.categoryService.repository.createQueryBuilder()
        .orderBy('id', 'DESC');
    }
    const result = await this.categoryService.paginate(query, { page, limit });
    return this.response.paginate(result, CategoryTransformer)
  }

  @Get(':categoryId')
  async show(@Param('categoryId') categoryId: number): Promise<ApiItemResponse<Category>> {
    const result = await this.categoryService.find(categoryId);
    return this.response.item(result, CategoryTransformer)
  }

  @Post()
  @Auth('admin')
  async create(@Body() data: CreateCategoryDto): Promise<ApiItemResponse<Category>> {
    let slug;
    const baseSlug = slugify(data.name, { lower: true });
    for (let i = 0; i < Infinity; i++) {
      slug = i === 0 ? baseSlug : `${baseSlug}-${i}`;
      if (!await this.categoryService.isExist(slug)) {
        break;
      }
    }
    const result = await this.categoryService.create({ name: data.name, slug });
    return this.response.item(result, CategoryTransformer)
  }

  @Put(':categoryId')
  @Auth('admin')
  async update(@Param('categoryId') categoryId: number, @Body() data: UpdateCategoryDto): Promise<ApiItemResponse<Category>> {
    const result = await this.categoryService.update(categoryId, { name: data.name });
    return this.response.item(result, CategoryTransformer)
  }

  @Delete(':categoryId')
  @Auth('admin')
  async delete(@Param('categoryId') categoryId: number): Promise<ApiSuccessResponse> {
    await this.categoryService.destroy(categoryId);
    return this.response.success();
  }
}

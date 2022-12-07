import { FindManyQueryParam } from './../@core/types';
import { pick } from 'lodash';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
} from '@server/common';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { ReviewTransformer } from './review.transformer';
import { CreateReviewDto, UpdateReviewDto } from './types';

@Controller('review')
@ApiTags('review')
@ApiBearerAuth()
export class ReviewController {
  constructor(
    private response: ApiResponseService,
    private reviewService: ReviewService
  ) {}

  @Get()
  @Auth('admin')
  async index(
    @Param() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Review>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;
    let query = this.reviewService.repository.createQueryBuilder('review');
    if (param.keyword) {
      query = query.andWhere('review.review LIKE :keyword', {
        keyword: `%${param.keyword}%`,
      });
    }
    const result = await this.reviewService.paginate(query, { page, limit });
    return this.response.paginate(result, ReviewTransformer);
  }

  @Get(':id')
  async show(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiItemResponse<Review>> {
    const result = await this.reviewService.find(id);

    return this.response.item(result, ReviewTransformer);
  }

  @Post()
  @Auth('admin')
  async create(
    @Body() data: CreateReviewDto
  ): Promise<ApiItemResponse<Review>> {
    const result = await this.reviewService.createReview(data);
    return this.response.item(result, ReviewTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateReviewDto
  ): Promise<ApiItemResponse<Review>> {
    const result = await this.reviewService.update(
      id,
      pick(data, ['image', 'user', 'review', 'rateCount'])
    );
    return this.response.item(result, ReviewTransformer);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiSuccessResponse> {
    await this.reviewService.destroyReview(id);
    return this.response.success();
  }
}

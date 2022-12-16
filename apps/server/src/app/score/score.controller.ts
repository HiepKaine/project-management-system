import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
} from '@server/common';
import { SelectQueryBuilder } from 'typeorm';
import { FindManyQueryParam } from '../@core/types';
import { Score } from './score.entity';
import { ScoreService } from './score.service';
import { ScoreTransformer } from './score.transformer';
import { createScoreDto, updateScoreDto } from './types';
@ApiTags('Score')
@Controller('score')
export class ScoreController {
  constructor(
    private response: ApiResponseService,
    private scoreService: ScoreService
  ) {}
  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Score>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;
    let query: SelectQueryBuilder<Score> =
      this.scoreService.repository.createQueryBuilder('score');

    if (param.keyword) {
      query = query.where(`score.studentId LIKE "%${param.keyword}%"`);
    }

    const result = await this.scoreService.paginate(query, { page, limit });
    return this.response.paginate(result, ScoreTransformer);
  }

  @Post()
  @Auth('admin')
  async create(@Body() data: createScoreDto): Promise<ApiItemResponse<Score>> {
    const result = await this.scoreService.create(data);

    return this.response.item(result, ScoreTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) scoreId: number,
    @Body() data: updateScoreDto
  ): Promise<ApiItemResponse<Score>> {
    const result = await this.scoreService.update(scoreId, data);
    return this.response.item(result, ScoreTransformer);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(
    @Param('id', ParseIntPipe) scoreId: number
  ): Promise<ApiSuccessResponse> {
    await this.scoreService.destroy(scoreId);
    return this.response.success();
  }
}

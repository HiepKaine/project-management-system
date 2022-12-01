import { result } from 'lodash-es';
import { FindManyQueryParam } from './../@core/types';
import { UserActivityManagerService } from './user-activity-manager.service';
import { Controller, Delete, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiCollectionResponse, ApiResponseService, ApiSuccessResponse, Auth } from '@server/common';
import { Ip } from './ip.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IpTransformer } from './ip.transformer';
import { UserActivityTransformer } from './user-activity.transformer';

@Controller('api/user-activity')
@ApiTags('User Activity')
@ApiBearerAuth()
export class UserActivityManagerController {

  constructor(
    private userActivityManagerService: UserActivityManagerService,
    private response: ApiResponseService,
  ) {

  }

  @Get(':userId/ip')
  @Auth('admin')
  async listUserIp(@Param('userId', ParseIntPipe) userId: number): Promise<ApiCollectionResponse<Ip>> {
    const result = await this.userActivityManagerService.listUserIp(userId);
    return this.response.collection(result, IpTransformer);
  }

  @Get(':userId/activity')
  @Auth('admin')
  async getUserActivity(@Query() param: FindManyQueryParam, @Param('userId', ParseIntPipe) userId: number): Promise<ApiCollectionResponse<Ip>> {
    const query = this.userActivityManagerService.repository.createQueryBuilder('userActivity')
      .leftJoinAndSelect('userActivity.ip', 'ip')
      .where('userActivity.userId = :userId', { userId })
      .orderBy('userActivity.id', 'DESC');

    const result = await this.userActivityManagerService.paginate(query, { page: param.page ?? 1, limit: param.limit ?? 20 });
    return this.response.paginate(result, UserActivityTransformer);
  }

  @Delete(':userId/ip/:ipId')
  @Auth('admin')
  async removeUserIp(@Param('userId', ParseIntPipe) userId: number, @Param('ipId', ParseIntPipe) ipId: number): Promise<ApiSuccessResponse> {
    await this.userActivityManagerService.removeUserIp(userId, ipId);
    return this.response.success();
  }
}

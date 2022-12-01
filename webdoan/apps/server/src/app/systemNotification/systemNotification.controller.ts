import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiItemResponse, ApiPaginateResponse, ApiResponseService, ApiSuccessResponse, Auth, AuthenticatedUser } from '@server/common';
import { Channel } from './channel.entity';
import { ChannelTransformer } from './channel.transformer';
import { ChannelService } from './channel.service';
import { SystemNotificationTransformer } from './systemNotification.transformer';
import { SystemNotificationService } from './systemNotification.service'
import { SystemNotification } from './systemNotification.entity'
import { UserChannelService } from './userChannel.service';
import { CreateChannelDto, UpdateChannelDto } from './types';
import { User } from '../auth/entity/user.entity';
import { UserNotificationUnreadService } from './userNotificationUnread.service';
import { UserNotificationUnread } from './userNotificationUnread.entity';

@Controller('api/system-notification')
@ApiTags('System Notification')
@Auth('admin')
export class SystemNotificationController {
  constructor(
    private response: ApiResponseService,
    private channelService: ChannelService,
    private userChannelService: UserChannelService,
    private systemNotificationService: SystemNotificationService,
    private userNotificationUnreadService: UserNotificationUnreadService
  ) {}


  @Get('channel')
  async getChannel():Promise<ApiPaginateResponse<Channel>> {
    const query = await this.channelService.repository.createQueryBuilder()
      .orderBy('id', 'DESC')
    const result = await this.channelService.paginate(query)
    return this.response.paginate(result, ChannelTransformer)
  }

  @Post('channel')
  async createChannel(@Body() data: CreateChannelDto): Promise<ApiItemResponse<Channel>> {
    const result = await this.channelService.create(data)
    return this.response.item(result, ChannelTransformer)
  }


@Put(':channelId')
  async updateChannel(@Param('channelId', ParseIntPipe) channelId: number, @Body() data: UpdateChannelDto): Promise<ApiItemResponse<Channel>> {
    const result = await this.channelService.update(channelId, data)
    return this.response.item(result, ChannelTransformer)
  }

  @Delete('/deleteChannel/:channelId')
  async deleteChannel(@Param('channelId', ParseIntPipe) channelId: number): Promise<ApiSuccessResponse> {
    await this.channelService.destroy(channelId)
    return this.response.success()
  }

  @Get()
  @Auth('admin')
  async getNotification(@AuthenticatedUser() user: User): Promise<ApiPaginateResponse<SystemNotification>> {
    const channels = await this.userChannelService.repository.find({
      where: {
        userId: user.id,
      }
    });

    const query = this.systemNotificationService.repository.createQueryBuilder('systemNotification')
        .leftJoinAndSelect('systemNotification.channel', 'channel')
        .where(`channel.id IN (${channels.map(item => item.channelId).join(',')})`);
    const result = await this.systemNotificationService.paginate(query);

    return this.response.paginate(result, SystemNotificationTransformer)
  }

  @Post('mark-as-all-read')
  @Auth('admin')
  async markAllAsRead(@AuthenticatedUser() user: User): Promise<ApiSuccessResponse> {
    await this.userNotificationUnreadService.repository.createQueryBuilder()
      .delete()
      .from(UserNotificationUnread)
      .where('userId = :userId', {userId: user.id})
      .execute()

      return this.response.success()
    }

  @Post('mark-as-read/:systemNotificationId')
  async markAsRead(@Param('systemNotificationId') systemNotificationId: number): Promise<ApiSuccessResponse> {
    const userNotificationUnread = await this.userNotificationUnreadService.repository.find({
      where: {
        systemNotificationId: systemNotificationId
      }
    });
    await this.userNotificationUnreadService.destroy(userNotificationUnread[0].id)
    return this.response.success()
  }

}

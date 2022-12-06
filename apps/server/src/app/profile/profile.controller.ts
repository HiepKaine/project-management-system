import { pick } from 'lodash';
import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiResponseService,
  AuthenticatedUser,
  JwtAuthGuard,
} from '@server/common';

import { User } from '../auth/entity/user.entity';
import { UserTransformer } from '../auth/transformer/user.transformer';
import { UpdateUserDto } from '../user/types';
import { UserService } from '../user/user.service';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private response: ApiResponseService,
    private userService: UserService,

  ) { }
  @Get()
  async profile(@AuthenticatedUser() user: User): Promise<ApiItemResponse<User>> {
    if (!user.status) {
      throw new BadGatewayException('Tài khoản của bạn đã bị khoá');
    }
    return this.response.item(user, UserTransformer);
  }

  @Put()
  async update(@AuthenticatedUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<ApiItemResponse<User>> {
    const result = await this.userService.update(user.id, pick(updateUserDto, ['email', 'firstName', 'lastName', 'phoneNumber', 'image']));
    return this.response.item(result, UserTransformer);
  }
}

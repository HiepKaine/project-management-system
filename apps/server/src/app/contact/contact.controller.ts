import { MailManagerService } from './../mail-manager/mail-manager.service';
import { Brackets } from 'typeorm';
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
import { NotificationType } from '../systemNotification/systemNotification.entity';
import { SystemNotificationService } from '../systemNotification/systemNotification.service';

import { Contact, ContactType } from './contact.entity';
import { ContactService } from './contact.service';
import { ContactTransformer } from './contact.transformer';
import {
  CreateContactDto,
  FindContactQueryParam,
  UpdateContactDto,
  UpdateContactStatusDto,
} from './types';
import { environment } from '@server/env/environment';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(
    private response: ApiResponseService,
    private contactService: ContactService,
    private systemNotificationService: SystemNotificationService,
    private mailManagerService: MailManagerService,
  ) { }

  @Get()
  async index(@Query() params: FindContactQueryParam): Promise<ApiPaginateResponse<Contact>> {
    let query;
    if (params.keyword) {
      query = await this.contactService.repository.createQueryBuilder()
        .where(new Brackets(sqb => {
          const searchPattern = `%${params.keyword}%`;
          sqb.where('name LIKE :searchPattern', { searchPattern })
          sqb.orWhere('email LIKE :searchPattern', { searchPattern })
          sqb.orWhere('phone LIKE :searchPattern', { searchPattern })
          sqb.orWhere('organization LIKE :searchPattern', { searchPattern })
        }))
        .orderBy('id', 'DESC');
    } else {
      query = await this.contactService.repository.createQueryBuilder()
        .orderBy('id', 'DESC');
    }
    const result = await this.contactService.paginate(query, { page: params.page ?? 1 });
    return this.response.paginate(result, ContactTransformer)
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) contactId: number): Promise<ApiItemResponse<Contact>> {
    const result = await this.contactService.find(contactId);
    return this.response.item(result, ContactTransformer)
  }

  @Post()
  async create(@Body() data: CreateContactDto): Promise<ApiItemResponse<Contact>> {
    const param = pick(data, ['name', 'email', 'phone', 'content', 'position', 'organization', 'type']);
    if (!param.content) {
      param.content = '';
    }
    const result = await this.contactService.create({ ...{ type: ContactType.Common }, ...param });
    let message = "";
    let notificationType = 0;

    if (data.type === ContactType.Common) {
      notificationType = NotificationType.UserContact
      message = `${data.email} đã liên hệ`
    } else if (data.type === ContactType.ByItem) {
      notificationType = NotificationType.UserByItem
      message = `${data.email} đã mua khóa học`
    }

    await this.systemNotificationService.createSystemNotification(notificationType, message);

    await this.mailManagerService.createAdminEmailNotification({
      subject: 'Liên hệ mới',
      title: 'Bạn có liên hệ mới',
      greeting: 'Xin chào',
      content: `Bạn có liên hệ mới từ ${data.email}, vui lòng kiểm tra tại ${environment.siteUrl}/admin/contact`
    });

    return this.response.item(result, ContactTransformer)
  }

  @Put('/:contactId/status')
  @Auth('admin')
  async updateContactStatus(@Param('contactId') contactId: number, @Body() data: UpdateContactStatusDto): Promise<ApiItemResponse<Contact>> {
    const result = await this.contactService.update(contactId, { status: data.status });
    return this.response.item(result, ContactTransformer)
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) contactId: number, @Body() data: UpdateContactDto): Promise<ApiItemResponse<Contact>> {
    const result = await this.contactService.update(contactId, data);
    return this.response.item(result, ContactTransformer)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) contactId: number): Promise<ApiSuccessResponse> {
    await this.contactService.destroy(contactId);
    return this.response.success();
  }
}


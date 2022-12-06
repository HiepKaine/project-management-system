import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Email } from './email.entity';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { CreateAdminEmailNotificationDto } from './types';

@Injectable()
export class MailManagerService extends BaseService<Email> {
  public entity: EntityTarget<Email> = Email;
  public repository: Repository<Email> = this.connection.getRepository(Email);
  private readonly logger = new Logger(MailManagerService.name);
  constructor(
    private readonly mailerService: MailerService,
    private connection: Connection) {
    super();
  }

  @Cron('45 * * * * *')
  async handleCron() {
    const emails = await this.getPendingEmail();
    if (Array.isArray(emails) && emails.length > 0) {
      this.logger.debug(`${emails.length} will be sent`);
    }
    for (const email of emails) {
      await this.send(email);
    }
  }

  private getPendingEmail(limit?: number): Promise<Email[]> {
    return this.repository.createQueryBuilder('email')
      .where('email.sent = 0')
      .andWhere('email.retry < 3')
      .limit(limit ?? 5)
      .getMany()
  }

  async createAdminEmailNotification(data: CreateAdminEmailNotificationDto) {
    const adminEmailAddress = this.connection.getRepository(Option).findOne({ where: { key: 'email' } });
    return this.create({ ...{ to: (await adminEmailAddress).value }, ...data });
  }

  async send(email: Email) {
    try {
      await this.mailerService
        .sendMail({
          to: email.to,
          subject: email.subject,
          template: 'email',
          context: {
            title: email.title,
            greeting: email.greeting,
            content: email.content,
          },
        });
      await this.update(email.id, { sent: true });
    } catch (error) {
      await this.update(email.id, { error: error.toString, retry: email.retry + 1 });
    }
  }
}

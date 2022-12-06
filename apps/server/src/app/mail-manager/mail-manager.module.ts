import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { environment } from '@server/env/environment';
import { MailManagerService } from './mail-manager.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        ignoreTLS: true,
        secure: false,
      },
      defaults: {},
      template: {
        dir: __dirname + '/public/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailManagerService],
  exports: [MailManagerService],
})
export class MailManagerModule {}

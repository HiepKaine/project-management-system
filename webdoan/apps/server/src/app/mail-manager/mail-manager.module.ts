import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { environment } from '@server/env/environment';
import { MailManagerService } from './mail-manager.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: environment.smtpHost,
        port: environment.smtpPort,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: environment.smtpUser,
          pass: environment.smtpPass,
        },
      },
      defaults: {
        from: `"Ôn Thi Công Chức" <${environment.smtpUser}>`,
      },
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
  exports: [MailManagerService]
})
export class MailManagerModule { }

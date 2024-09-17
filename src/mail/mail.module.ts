import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { TelegramService } from './telegram.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: any) => ({
        transport: {
          host: process.env.HOST,
          port: 587,
          auth: {
            user: process.env.MAIL,
            pass: process.env.PASS,
          },
        },
        defaults: {
          from: `"Обратная форма сайта" <${process.env.MAIL}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService,TelegramService],
  exports: [MailService,TelegramService],

  controllers: [MailController],
})
export class MailModule {}

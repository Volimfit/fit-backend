import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    MailModule,
  ],
})
export class AppModule {}

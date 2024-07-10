import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(user: any, token: string) {
    await this.mailerService.sendMail({
      to: process.env.MAIL,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Заявка с сайта',
      template: './welcome', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        number: user.number,
      },
    });
  }
}

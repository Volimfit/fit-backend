import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail(@Body() body: { number: string; recaptcha: string }) {
    const { number, recaptcha } = body;
    await this.mailService.sendUserConfirmation({ number }, recaptcha);
    return { message: 'Email sent successfully' };
  }
}

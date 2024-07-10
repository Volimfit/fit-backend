import { Body, Controller, Post } from '@nestjs/common';

import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly MailService: MailService) {}
  @Post('send-email')
  public findAll(@Body() body: any): Promise<any> {
    return this.MailService.sendUserConfirmation(body, '');
  }
}

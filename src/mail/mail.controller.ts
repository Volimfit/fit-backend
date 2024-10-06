import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { TelegramService } from './telegram.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService, private readonly telegramService: TelegramService,) {}

  @Post('send-email')
  async sendEmail(@Body() body: { number: string; recaptcha: string }) {
    const { number, recaptcha } = body;
    try{
      await this.mailService.sendUserConfirmation({ number }, recaptcha).then(()=>{
        this.telegramService.sendMessage(`Новая заявка с номером: ${number}`);
      });
      
    }
    catch{
      await this.telegramService.sendMessage(`Отправка писем дала сбой,связаться с @grby_97`);
    }

   
    return { message: 'Email sent successfully' };
  }

  @Post('send-email-trainer')
  async sendEmailTrainer(@Body() body: { number: string; recaptcha: string ;name:string}) {
    const { number, recaptcha,name } = body;
    try{
      await this.mailService.sendUserConfirmationTrainer({ number },{name}, recaptcha).then(()=>{
        this.telegramService.sendMessage(`Заявка на персональную тренировку к ${name}.Номер клиента: ${number}`);
      });
      
    }
    catch{
      await this.telegramService.sendMessage(`Отправка писем дала сбой,связаться с @grby_97`);
    }

   
    return { message: 'Email sent successfully' };
  }
  @Get('test')
  async sendTelegram() {

    this.telegramService.sendMessage(`Отправка писем дала сбой,связаться с @grby_97`);
  
    return { message: 'Email sent successfully' };
  }
}

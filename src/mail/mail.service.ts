import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async verifyRecaptcha(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Ваш секретный ключ reCAPTCHA
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    console.log(url);
    try {
      const response = await axios.post(url);
      return response.data.success;
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      return false;
    }
  }

  async sendUserConfirmation(user: any, token: string) {
    const isRecaptchaValid = await this.verifyRecaptcha(token);
    console.log(isRecaptchaValid);
    if (!isRecaptchaValid) {
      throw new BadRequestException('Invalid reCAPTCHA');
    }

    await this.mailerService.sendMail({
      to: process.env.MAIL,
      subject: 'Заявка с сайта',
      template: './welcome', // `.hbs` extension is appended automatically
      context: {
        number: user.number,
      },
    });
  }
}

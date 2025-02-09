import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private chatId: string = process.env.CHAT_ID;; // ID сообщества/группы

  constructor() {
    const token = process.env.BOT_ID; 
    this.bot = new TelegramBot(token, { polling: true });
 
  
  }
  
  async sendMessage(message: string) {
    await this.bot.sendMessage(this.chatId, message);
  }
}

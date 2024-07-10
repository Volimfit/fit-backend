import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Здесь можно указать конкретные домены или оставить '*' для разрешения всех доменов
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(PORT, () => console.log(`serv start on port = ${PORT}`));
}

start();

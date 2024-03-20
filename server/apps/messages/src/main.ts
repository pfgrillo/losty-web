import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages.module';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.enableCors({
    origin: [
      'http://10.0.2.2',
      'http://localhost',
      /^http:\/\/localhost:30[0-9]+$/,
      /^http:\/\/localhost:80/,
      /^http:\/\/localhost\/socket\.io\/.*/,
      /^http:\/\/10.0.2[01]$/,
      'http://192.168.1.100',
    ],
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('MESSAGES'));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();

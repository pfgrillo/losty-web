import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { RmqOptions } from '@nestjs/microservices';
//import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors({
    origin: [
      'http://10.0.2.2',
      'http://localhost',
      /^http:\/\/localhost:30[0-9]+$/,
      /^http:\/\/10.0.2[01]$/,
      /^http:\/\/127\.0\.0\.1$/,
    ],
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();

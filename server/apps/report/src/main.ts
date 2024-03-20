import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReportModule } from './report.module';

async function bootstrap() {
  const app = await NestFactory.create(ReportModule);
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
  app.connectMicroservice(rmqService.getOptions('REPORT'));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();

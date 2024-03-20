import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
// import { REPORT_SERVICE } from './constants/services';
import { ReportedItem, ReportedItemSchema } from './schemas/report.schema';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportRepository } from './report.repository';
import { AUTH_SERVICE } from '@app/common/auth/services';

@Module({
  imports: [
    DatabaseModule,
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/report/.env',
    }),
    MongooseModule.forFeature([
      { name: ReportedItem.name, schema: ReportedItemSchema },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository],
})
export class ReportModule {}

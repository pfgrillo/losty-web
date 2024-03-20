import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/chat.schema';
import { ChatService } from './services/chat.service';
import { OnlineUsersService } from './services/online-users.service';
import { ChatController } from './controllers/chat.controller';
import { ChatGateway } from './chat.gateway';
import { AUTH_SERVICE } from '@app/common/auth/services';
import { USERS_SERVICE } from 'apps/users/src/constants/services';
import { REPORT_SERVICE } from 'apps/report/src/constants/services';

@Module({
  imports: [
    DatabaseModule,
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    RmqModule.register({
      name: USERS_SERVICE,
    }),
    RmqModule.register({
      name: REPORT_SERVICE,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: '.apps/messages/.env',
    }),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, OnlineUsersService],
})
export class MessagesModule {}

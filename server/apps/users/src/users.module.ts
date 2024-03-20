import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { User, UserSchema } from './schemas/users.schema';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
//import { USERS_SERVICE } from './constants/services';
import { AUTH_SERVICE } from 'apps/auth/src/constants/service';

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
      envFilePath: '.apps/users/.env',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}

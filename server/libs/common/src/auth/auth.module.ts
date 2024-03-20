import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RmqModule } from '../rmq/rmq.module';
import { AUTH_SERVICE } from './services';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  providers: [JwtAuthGuard],
  exports: [RmqModule.register({ name: AUTH_SERVICE })],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}

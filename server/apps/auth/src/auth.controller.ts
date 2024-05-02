import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
// import { Response } from 'express';
import { AuthService } from './auth.service';
// import { CurrentUser } from './current-user.decorator';
// import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAuth } from './interfaces/user.interface';
// import { User } from './users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: IAuth) {
    return this.authService.register(body);
  }

  //@UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'verify-jwt' })
  async validateUser(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    return this.authService.validateToken(payload.jwt);
  }

  @MessagePattern({ role: 'auth', cmd: 'decode' })
  async decodeToken(token) {
    try {
      const res = this.authService.decodeToken(token.jwt);
      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}

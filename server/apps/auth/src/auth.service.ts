import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './users/schemas/user.schema';
import { IAuth, IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
// import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// import { USERS_SERVICE } from 'apps/users/src/constants/services';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,

    @InjectModel(User.name)
    private readonly userModel: Model<IUser>,
  ) {}

  async login(credentials: IAuth) {
    const user: IUser = await this.findByUsername(credentials.username);

    if (!user) {
      // Handle the case where the username does not exist
      // You can return an error response or throw an exception
      throw new Error('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { user: credentials, sub: credentials.id };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });

    return {
      username: user.username,
      token,
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  decodeToken(jwt: string) {
    return this.jwtService.decode(jwt);
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ email });
    return !existingUser;
  }

  async findByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }
  rec;
}

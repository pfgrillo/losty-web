import { Document } from 'mongoose';

export interface IAuth extends Document {
  readonly username: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export interface IUser extends Document {
  readonly id: string;
  readonly password: string;
  readonly username: string;
  readonly token: string;
}

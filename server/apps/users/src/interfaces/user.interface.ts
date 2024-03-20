import { Document } from 'mongoose';

export interface UserInterface extends Document {
  readonly name: string;
  readonly username: string;
  readonly items: [];
  readonly chats: { chatRoom: string; users: string[]; item: any }[];
}

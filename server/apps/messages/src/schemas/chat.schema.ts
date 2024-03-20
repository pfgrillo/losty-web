import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatsDocument = Message & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Message extends Document {
  @Prop([
    {
      text: { type: String, required: true },
      from: { type: String, required: true },
    },
  ])
  messages: { text: string; from: string }[];

  @Prop()
  host: string;

  @Prop()
  guest: string;

  @Prop()
  chatRoom: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

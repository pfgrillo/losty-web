import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends AbstractDocument {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop()
  items: [];

  @Prop()
  chats: { chatRoom: string; users: string[]; item: any }[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 1 }, { unique: true });

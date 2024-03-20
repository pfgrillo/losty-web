import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/chat.schema';
import { Model } from 'mongoose';
import { MessageInterface } from '../interfaces/chats.interface';
import { Message2 } from '../models/chat.models';
//import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageInterface>,
    /* @Inject('USERS_CLIENT')
        private readonly usersClient: ClientProxy, */
  ) {}

  async openRoom(chatRoom: string, host: string, guest: string): Promise<any> {
    try {
      // Check if room already exists
      const room = await this.messageModel.findOne({ chatRoom });
      if (room) return room;

      const newRoom = new this.messageModel({
        chatRoom,
        host,
        guest,
        messages: [],
      });
      await newRoom.save();

      // Add new room to creator and guest users
      //this.usersClient.emit('room_created', newRoom);

      return newRoom;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async saveMessage(payload: Message2): Promise<any> {
    try {
      const { from } = payload;
      const newMessage = await this.messageModel.findOneAndUpdate(
        { chatRoom: payload.chatRoom },
        { $push: { messages: { text: payload.message, from } } },
        { new: true },
      );

      if (newMessage) return newMessage;
      else return 'Failed to add message to the database';
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getMessages(payload): Promise<any> {
    const messages = await this.messageModel.find(payload);
    return messages[0];
  }
}

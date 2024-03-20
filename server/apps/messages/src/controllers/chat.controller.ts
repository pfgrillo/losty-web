import {
  Controller,
  // Inject,
  Logger,
  Post,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from '../services/chat.service';
// import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '@app/common';
import { Message2 } from '../models/chat.models';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('save_message')
  async saveMessage(@Body() message: Message2): Promise<any> {
    return await this.chatService.saveMessage(message);
  }

  @Post('messages')
  async getMessages(@Body() chatRoom: string): Promise<any> {
    return await this.chatService.getMessages(chatRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Put('open_room')
  async openRoom(
    @Body() body: { host: string; guest: string; chatRoom: string },
  ): Promise<any> {
    try {
      const { host, guest, chatRoom } = body;
      const newRoom = await this.chatService.openRoom(chatRoom, host, guest);
      return newRoom;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}

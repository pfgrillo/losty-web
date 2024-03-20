import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnlineUsersService } from './services/online-users.service';
import { Logger } from "@nestjs/common";
import { ClientToServerEvents, Message, ServerToClientEvents } from './models/chat.models';

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();
  
  private users = [];

  constructor(private onlineUsersService: OnlineUsersService) { }

  private readonly logger = new Logger(ChatGateway.name);
  handleConnection(client: Socket) {
    const { sockets } = this.server.sockets;
    const connectedClients = Array.from(sockets).map(([, socket]) => ({
      userID: socket.id,
    }));
    client.emit('connected clients', connectedClients);

    client.on('add_user', (userId) => {
      this.onlineUsersService.addUser(userId, client.id);
    });

    client.on('send-msg', (data) => {
      const sendUserSocket = this.onlineUsersService.getSocketId(data.to);
      if (sendUserSocket) {
        client.to(sendUserSocket).emit('msg_recieve', data);
      }
    });
  }

  async handleDisconnect() {
    //await this.chatsService.removeUserFromAllRooms(client.id);
  }

  @SubscribeMessage('chat')
  async handleEvent(
    @MessageBody()
    payload: Message,
  ): Promise<Message> {
    this.server.to(payload.roomName).emit('chat', payload);
    return payload;
  }
}

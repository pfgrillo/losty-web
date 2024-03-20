import { Injectable } from '@nestjs/common';

@Injectable()
export class OnlineUsersService {
  private onlineUsers = new Map<string, string>(); // userId -> socketId

  addUser(userId: string, socketId: string) {
    this.onlineUsers.set(userId, socketId);
  }

  removeUser(userId: string) {
    this.onlineUsers.delete(userId);
  }

  getSocketId(userId: string) {
    return this.onlineUsers.get(userId);
  }

  getAllOnlineUsers() {
    return Array.from(this.onlineUsers.keys());
  }
}

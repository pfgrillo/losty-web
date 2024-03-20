import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AbstractRepository } from '@app/common';

@Injectable()
export class UsersService extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectConnection()
    connection: Connection,
  ) {
    super(userModel, connection);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findOne(query: any): Promise<User> {
    try {
      return await this.userModel.findOne(query).exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async addItemToUser(
    query: { username: string },
    item: any,
  ): Promise<UserInterface> {
    try {
      return await this.userModel
        .findOneAndUpdate(query, { $push: { items: item } }, { new: true })
        .exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async deleteItemFromUser(
    username: string,
    itemId: string,
  ): Promise<UserInterface> {
    try {
      return this.userModel
        .findOneAndUpdate(
          { username },
          { $pull: { items: { id: itemId } } },
          { new: true },
        )
        .exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async addChatToUser(data): Promise<UserInterface> {
    // Check if chat already exists
    const existingChat = await this.userModel
      .findOne({
        username: data.username,
        chats: {
          $elemMatch: {
            chatRoom: data.chatRoom,
          },
        },
      })
      .exec();

    if (existingChat) {
      return existingChat;
    }

    try {
      return this.userModel
        .findOneAndUpdate(
          { username: data.username },
          {
            $push: {
              chats: {
                chatRoom: data.chatRoom,
                users: data.users,
                item: data.chatRoom.substring(0, 24),
              },
            },
          },
          { new: true },
        )
        .exec();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}

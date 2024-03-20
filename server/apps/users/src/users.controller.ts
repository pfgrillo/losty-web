import {
  Controller,
  Inject,
  Logger,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ClientProxy,
  // Ctx,
  EventPattern,
  // RmqContext,
} from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'apps/auth/src/constants/service';
import { catchError, from, switchMap } from 'rxjs';
import { JwtAuthGuard } from '@app/common';
// import { RmqService } from "@app/common";

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(
    private readonly usersService: UsersService,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req: Request): Promise<any> {
    const token = this.authClient.send(
      { role: 'auth', cmd: 'decode' },
      { jwt: req.headers['authorization']?.split(' ')[1] },
    );

    return from(token).pipe(
      switchMap(async (data) => {
        return await this.usersService.findOne({
          username: data.user.username,
        });
      }),
      catchError((error) => {
        console.error(error);
        throw new Error('Error fetching user');
      }),
    );
  }

  @MessagePattern('find_user')
  public async findUser(
    user: { username: string },
    // @Ctx() context: RmqContext,
  ): Promise<any> {
    if (user) {
      await this.usersService.findOne(user);
      //this.rmqService.ack(context);
    }
    return null;
  }

  @EventPattern('user_created')
  async handleUserCreated(
    data: { id: string; email: string },
    // @Ctx() context: RmqContext,
  ) {
    const userDto: CreateUserDto = {
      username: data.email,
      name: data.email,
      items: [],
      chats: [],
    };

    await this.usersService.createUser(userDto);
    //this.rmqService.ack(context);
  }

  @EventPattern('reported_item')
  async handleReportedItem(data: any) {
    const reportedItem: any = {
      id: data._id,
      coordinates: data.coordinates,
      description: data.description,
      reportType: data.reportType,
      user: data.user,
      itemType: data.itemType,
      place: data.place,
      reportDate: data.reportDate,
      reportTime: data.reportTime,
      title: data.title,
    };

    return await this.usersService.addItemToUser(
      { username: data.user },
      reportedItem,
    );
  }

  @EventPattern('item_deleted')
  async handleItemDeleted(data: { id: string; user: { user: string } }) {
    const item = data.id;

    return await this.usersService.deleteItemFromUser(data.user.user, item);
  }

  @EventPattern('room_created')
  async handleChatCreated(data: any) {
    await this.usersService.addChatToUser({
      username: data.guest,
      chatRoom: data.chatRoom,
      users: [data.host],
    });

    await this.usersService.addChatToUser({
      username: data.host,
      chatRoom: data.chatRoom,
      users: [data.guest],
    });

    return;
  }

  /* @Get()
  async getUser(@Req() req: Request): Promise<any> {
    const token = this.authClient.send(
      { role: 'auth', cmd: 'decode' },
      { jwt: req.headers['authorization']?.split(' ')[1] }
    );

    return from(token)
      .pipe(
        switchMap(async (data) => {
          return await this.userService.findOne({ username: data.user.username });
        }),
        catchError((error) => {
          console.error(error);
          throw new Error('Error fetching user');
        })
      )
  } */
}

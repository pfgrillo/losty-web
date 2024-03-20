import { Controller, Get, Logger } from '@nestjs/common';
import { ReportService } from './report.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
// import { JwtAuthGuard } from '@app/common';

@Controller('items')
export class ReportController {
  private logger = new Logger(ReportController.name);
  constructor(private readonly reportService: ReportService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getItems() {
    return this.reportService.findAllItems();
  }

  @MessagePattern('report_item')
  public async reporItem(userItem: any): Promise<any> {
    if (userItem) {
      return await this.reportService.reportItem(userItem);
    }
    return null;
  }

  @MessagePattern('find_all_items')
  public async findAllItems(@Ctx() context: RmqContext): Promise<any> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      this.logger.log(`Try to find news`);
      return await this.reportService.findAllItems();
    } finally {
      this.logger.log(`FindAllNews: Acknowledge message success`);
      await channel.ack(originalMessage);
    }
  }

  @MessagePattern('delete_item')
  public async deleteItemById(
    item: { id: string; user: any },
    // @Ctx() context: RmqContext,
  ): Promise<any> {
    if (item) {
      this.reportService.remove(item.id);
      //this.rmqService.ack(context);
    }
    return null;
  }

  /* @Post()
  create(@Req() req: Request) {
    // Decodes token with auth api to get username
    const token = this.authClient.send(
      { role: 'auth', cmd: 'decode' },
      { jwt: req.headers['authorization']?.split(' ')[1] }
    );

    return from(token)
      .pipe(
        switchMap((data) => {
          const userItem = {
            ...req.body,
            user: data.user.username,
          }

          return this.reportService.reportItem(userItem);
        }),
        catchError((error) => {
          console.error(error);
          throw new Error('Error fetching user');
        })
      )
  } 

  @Get()
  findLostItems(@Req() req: Request) {
    return this.reportService.findAllItems();
  }
  

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const token = this.authClient.send(
      { role: 'auth', cmd: 'decode' },
      { jwt: req.headers['authorization']?.split(' ')[1] }
    );

    return from(token)
      .pipe(
        switchMap((data) => {
          const user = {
            ...req.body,
            user: data.user.username,
          }

          return this.reportService.remove(id, user);
        }),
        catchError((error) => {
          console.error(error);
          throw new Error('Error fetching user');
        })
      )
  }
  */
  /* @Get('found')
  findFoundItems() {
    return this.reportService.findFoundItems();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLostItemDto: UpdateLostItemDto,
  ) {
    return this.reportService.update(+id, updateLostItemDto);
  } */
}

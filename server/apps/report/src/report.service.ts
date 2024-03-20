import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { Connection, Model } from 'mongoose';
import { ReportedItem } from './schemas/report.schema';
import { ReportItemDto } from './dto/report-item.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ReportItem, ReportType } from './interfaces/report.interface';

@Injectable()
export class ReportService extends AbstractRepository<ReportedItem> {
  protected readonly logger = new Logger(ReportService.name);

  constructor(
    @InjectModel(ReportedItem.name)
    private readonly reportItemModel: Model<ReportedItem>,
    @InjectConnection()
    connection: Connection,
    /* @Inject('USER_CLIENT')
    private readonly userClient: ClientProxy */
  ) {
    super(reportItemModel, connection);
  }
  async reportItem(ReportItemDto: ReportItemDto): Promise<ReportItem> {
    const createdLostItem = new this.reportItemModel(ReportItemDto);

    const reportedItem = await createdLostItem.save();

    //this.userClient.emit('reported_item', reportedItem);

    return reportedItem;
  }
  async findAllItems() {
    return await this.reportItemModel.find().exec();
  }
  async findLostItems() {
    return await this.reportItemModel
      .find({ reportType: ReportType.LOST })
      .exec();
  }

  async findFoundItems() {
    return await this.reportItemModel
      .find({ reportType: ReportType.FOUND })
      .exec();
  }

  /* findOne(id: number) {
    return `This action returns a #${id} lostItem`;
  } */

  /* update(id: number, updateLostItemDto: UpdateLostItemDto) {
    return `This action updates a #${id} lostItem`;
  } */

  async remove(id: string) {
    //const itemData = { id, user }

    //this.userClient.emit('item_deleted', itemData);

    return await this.reportItemModel.findByIdAndDelete(id).exec();
  }
}

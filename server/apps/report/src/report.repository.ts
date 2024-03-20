import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { ReportedItem } from './schemas/report.schema';

@Injectable()
export class ReportRepository extends AbstractRepository<ReportedItem> {
  protected readonly logger = new Logger(ReportRepository.name);

  constructor(
    @InjectModel(ReportedItem.name) reportModel: Model<ReportedItem>,
    @InjectConnection() connection: Connection,
  ) {
    super(reportModel, connection);
  }
}

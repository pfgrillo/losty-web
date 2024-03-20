import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import * as mongoose from 'mongoose';
import {
  Coordinates,
  ItemType,
  ReportType,
} from '../interfaces/report.interface';

@Schema()
export class ReportedItem extends AbstractDocument {
  @Prop()
  user: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  place: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  coordinates: Coordinates;

  @Prop()
  reportDate: string;

  @Prop()
  reportTime: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  itemType: ItemType;

  @Prop({ type: String, enum: ReportType })
  reportType: ReportType;
}

export const ReportedItemSchema = SchemaFactory.createForClass(ReportedItem);

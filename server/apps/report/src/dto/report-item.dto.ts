import { Coordinates, ItemType, ReportType } from '../interfaces/report.interface';

export class ReportItemDto {
  _id: string;
  user: string;
  title: string;
  description: string;
  place: string;
  coordinates: Coordinates;
  reportDate: string;
  reportTime: string;
  itemType: ItemType;
  reportType: ReportType;
}

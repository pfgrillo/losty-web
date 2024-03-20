import { Document } from 'mongoose';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ItemType {
  readonly label: string;
  readonly icon: string;
}

export enum ReportType {
  LOST = 'lost',
  FOUND = 'found',
}

export interface ReportItem extends Document {
  readonly user: string;
  readonly title: string;
  readonly description: string;
  readonly place: string;
  readonly coordinates: Coordinates;
  readonly reportDate: string;
  readonly reportTime: string;
  readonly itemType: ItemType;
  readonly reportType: ReportType;
}

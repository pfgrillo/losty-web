import { ReportedItem } from "./ReportedItem";

export interface User {
  username: string;
  items?: ReportedItem[];
}

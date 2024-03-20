import { IconType } from "react-icons";
import { ColorButtonKey } from "../colors";

export type MenuAsideItem = {
  label: string;
  icon?: IconType;
  href?: string;
  target?: string;
  color?: ColorButtonKey;
  isLogout?: boolean;
  menu?: MenuAsideItem[];
}

export type MenuNavBarItem = {
  label?: string;
  icon?: any;
  href?: string;
  target?: string;
  isDivider?: boolean;
  isLogout?: boolean;
  isCurrentUser?: boolean;
  menu?: MenuNavBarItem[];
}

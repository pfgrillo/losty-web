import { MenuAsideItem } from "../../../models/MenuItems";
import AsideMenuItem from "./Item";

type Props = {
  menu: MenuAsideItem[];
  isDropdownList?: boolean;
  className?: string;
}

const AsideMenuList = ({ menu, isDropdownList = false, className = '' }: Props) => {
  return (
    <ul className={className}>
      {menu.map((item, index) => (
        <AsideMenuItem key={index} item={item} isDropdownList={isDropdownList} />
      ))}
    </ul>
  )
}

export default AsideMenuList;

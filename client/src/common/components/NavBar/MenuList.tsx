import NavBarItem from './Item';
import { MenuNavBarItem } from '../../../models/MenuItems';

type Props = {
  menu: MenuNavBarItem[];
  onClick: () => void;
}

const NavBarMenuList = ({ menu, onClick }: Props) => {
  return (
    <>
      {menu.map((item, index) => (
        <NavBarItem key={index} item={item} onClick={ () => onClick }/>
      ))}
    </>
  )
}

export default NavBarMenuList;
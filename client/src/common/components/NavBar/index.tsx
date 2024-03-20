import { ReactNode, useState } from 'react';
import NavBarItemPlain from './Item/Plain';
import NavBarMenuList from './MenuList';
import { MenuNavBarItem } from '../../../models/MenuItems';
import { IoIosClose } from 'react-icons/io';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto'

type Props = {
  menu: MenuNavBarItem[];
  className: string;
  children: ReactNode;
}

const NavBar = ({ menu, className = '', children }: Props) => {
  const [isMenuNavBarActive, setIsMenuNavBarActive] = useState(false);

  const handleMenuNavBarToggleClick = () => {
    setIsMenuNavBarActive(!isMenuNavBarActive);
  }

  return (
    <nav
      className={`${className} top-0 inset-x-0 fixed bg-gray-50 h-14 z-30 transition-position w-screen lg:w-auto`}
    >
      <div className={`flex lg:items-stretch ${containerMaxW}`}>
        <div className="flex flex-1 items-stretch h-14">{children}</div>
        <div className="flex-none items-stretch flex h-14 lg:hidden">
          <NavBarItemPlain onClick={handleMenuNavBarToggleClick}>
            {isMenuNavBarActive
              ? <IoIosClose color="#6366F1" size={24} />
              : <HiOutlineEllipsisVertical color="#6366F1" size={24} />
            }
          </NavBarItemPlain>
        </div>
        <div
          className={`${isMenuNavBarActive ? 'block' : 'hidden'
            } max-h-screen-menu overflow-y-auto lg:overflow-visible absolute w-screen top-14 left-0 bg-gray-50 shadow-lg lg:w-auto lg:flex lg:static lg:shadow-none`}
        >
          <NavBarMenuList menu={menu} onClick={ () => setIsMenuNavBarActive(!isMenuNavBarActive) }/>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;

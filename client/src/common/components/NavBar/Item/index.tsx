import { useState } from 'react';
import NavBarMenuList from '../MenuList';
import { MenuNavBarItem } from '../../../../models/MenuItems';
import { useAppDispatch } from '../../../../hooks/storeHook';
import { logout } from '../../../../store/features/authSlice';
import UserAvatarCurrentUser from '../../../../features/user/components/CurrentUser';
import Divider from '../../Divider';
import { Link } from 'react-router-dom';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

type Props = {
  item: MenuNavBarItem;
  onClick?: () => void;
}

const NavBarItem = ({ item, onClick }: Props) => {
  const dispatch = useAppDispatch();

  const username = localStorage.getItem('user');

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const componentClass = [
    'block lg:flex items-center relative cursor-pointer',
    isDropdownActive
      ? `navbar-item-label-active`
      : `navbar-item-label`,
    item.menu ? 'lg:py-2 lg:px-3' : 'py-2 px-3',
  ].join(' ');

  const itemLabel = item.isCurrentUser ? username : item.label;

  const handleMenuClick = () => {
    if (item.menu) {
      setIsDropdownActive(!isDropdownActive);
      return;
    } else if (item.isLogout) {
      dispatch(logout);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsDropdownActive(false);
      return;
    }
  }

  const handleItemClick = () => {
    if (item.menu) {
      setIsDropdownActive(false);
    }
  }

  const NavBarItemComponentContents = (
    <>
      <div
        className={`flex items-center ${item.menu
          ? 'bg-gray-100 0 lg:bg-transparent  p-3 lg:p-0'
          : ''
          }  hover:text-slate-500`}
        onClick={handleMenuClick}
      >
        {item.isCurrentUser && <UserAvatarCurrentUser className="w-8 h-8 inline-flex" />}
        {item.icon}
        <span
          className={`px-2 transition-colors`}
        >
          {itemLabel}
        </span>
        {item.menu && (
          isDropdownActive
            ? <IoIosArrowUp color="#6366F1" className="hidden lg:inline-flex transition-colors" />
            : <IoIosArrowDown color="#6366F1" className="hidden lg:inline-flex transition-colors" />
        )}
      </div>
      {item.menu && (
        <div
          onClick={handleItemClick}
          className={`${!isDropdownActive ? 'lg:hidden' : ''}
          text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg`}
        >
          <NavBarMenuList menu={item.menu} onClick={ () => setIsDropdownActive(false) }/>
        </div>
      )}
    </>
  )

  if (item.isDivider) {
    return <Divider navBar />
  }

  if (item.href) {
    return (
      <Link to={item.href} target={item.target} className={componentClass}>
        {NavBarItemComponentContents}
      </Link>
    )
  }

  if (item.isLogout) {
    return (
      <Link to={'/login'} target={item.target} className={componentClass}>
        {NavBarItemComponentContents}
      </Link>
    )
  }

  return <div className={componentClass}>{NavBarItemComponentContents}</div>
}

export default NavBarItem;

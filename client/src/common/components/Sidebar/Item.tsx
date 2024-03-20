import { ReactElement, useState } from 'react';
import AsideMenuList from './List';
import { IoMdRemove, IoMdAdd } from 'react-icons/io';
import { MenuAsideItem } from '../../../models/MenuItems';
import { IconType } from 'react-icons';
import { getButtonColor } from '../../../colors';
import { Link } from 'react-router-dom';

type Props = {
  item: MenuAsideItem;
  isDropdownList?: boolean;
}

const AsideMenuItem = ({ item, isDropdownList = false }: Props) => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const activeClassAddon = !item.color && isLinkActive ? 'aside-menu-item-active font-bold' : '';

  const IconComponent = ({ icon }: { icon: IconType }): ReactElement => {
    return icon({ size: 18, className: `flex-none ${activeClassAddon} w-16 self-center` });
  };

  const asideMenuItemInnerContents = (
    <>
      {item.icon && (
        <IconComponent icon={item.icon} />
      )}
      <span
        className={`grow text-ellipsis line-clamp-1 ${item.menu ? '' : 'pr-12'
          } ${activeClassAddon}`}
      >
        {item.label}
      </span>
      {item.menu && (
        <IconComponent icon={isDropdownActive ? IoMdRemove : IoMdAdd} />
      )}
    </>
  )

  const componentClass = [
    'flex cursor-pointer',
    isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
    item.color
      ? getButtonColor(item.color, false, true)
      : `aside-menu-item hover:text-slate-300`,
  ].join(' ');

  return (
    <li>
      {item.href && (
        <Link to={item.href} target={item.target} className={componentClass}>
          {asideMenuItemInnerContents}
        </Link>
      )}
      {!item.href && (
        <div className={componentClass} onClick={() => setIsDropdownActive(!isDropdownActive)}>
          {asideMenuItemInnerContents}
        </div>
      )}
      {item.menu && (
        <AsideMenuList
          menu={item.menu}
          className={`aside-menu-dropdown ${isDropdownActive ? 'block' : 'hidden'
            }`}
          isDropdownList
        />
      )}
    </li>
  )
}

export default AsideMenuItem;

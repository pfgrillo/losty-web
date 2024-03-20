import React from 'react'
import { RiCloseLine } from 'react-icons/ri';
import { MenuAsideItem } from '../../../models/MenuItems';
import AsideMenuList from './List';

type Props = {
  menu: MenuAsideItem[];
  className?: string;
  onAsideLgCloseClick: () => void;
}

const AsideMenuLayer = ({ menu, className = '', ...props }: Props) => {
  const handleAsideLgCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onAsideLgCloseClick();
  }

  return (
    <aside
      className={`${className} zzz lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={`aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden bg-indigo-600 text-white`}
      >
        <div
          className={`aside-brand flex flex-row h-14 items-center justify-between bg-indigo-900`}
        >
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <div>Losty</div>
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <RiCloseLine />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${'aside-scrollbars'
            }`}
        >
          <AsideMenuList menu={menu} />
        </div>
      </div>
    </aside>
  )
}

export default AsideMenuLayer;

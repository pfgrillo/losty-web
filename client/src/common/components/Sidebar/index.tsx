import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { MenuAsideItem } from "../../../models/MenuItems";
import AsideMenuLayer from "./Layer";
import OverlayLayer from "../OverlayLayer";

type Props = {
  menu: MenuAsideItem[];
  isAsideMobileExpanded: boolean;
  isAsideLgActive: boolean;
  onAsideLgClose: () => void;
}

const Sidebar = ({
  isAsideMobileExpanded = false,
  isAsideLgActive = false,
  ...props
}: Props) => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname, isTabletMid]);

  return <>
    <AsideMenuLayer
      menu={props.menu}
      className={`${isAsideMobileExpanded ? 'left-0' : '-left-60 lg:left-0'} ${!isAsideLgActive ? 'lg:hidden xl:flex' : ''
        }`}
      onAsideLgCloseClick={props.onAsideLgClose}
    />
    {isAsideLgActive && <OverlayLayer zIndex="z-30" onClick={props.onAsideLgClose} />}
  </>
};

export default Sidebar;

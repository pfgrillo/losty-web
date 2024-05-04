import { ReactElement } from "react";
import { MenuAsideItem } from "../../../models/MenuItems";
import { IconType } from "react-icons";
import { getButtonColor } from "../../../colors";
import { Link } from "react-router-dom";

type Props = {
  item: MenuAsideItem;
  isDropdownList?: boolean;
};

const AsideMenuItem = ({ item, isDropdownList = false }: Props) => {
  const activeClassAddon =
    !item.color ? "aside-menu-item-active font-bold" : "";

  const IconComponent = ({ icon }: { icon: IconType }): ReactElement => {
    return icon({
      size: 18,
      className: `flex-none ${activeClassAddon} w-16 self-center`,
    });
  };

  const asideMenuItemInnerContents = (
    <>
      {item.icon && <IconComponent icon={item.icon} />}
      <span
        className={`grow text-ellipsis line-clamp-1 ${
          item.menu ? "" : "pr-12"
        } ${activeClassAddon}`}
      >
        {item.label}
      </span>
    </>
  );

  const componentClass = [
    "flex cursor-pointer",
    "py-3",
    item.color
      ? getButtonColor(item.color, false, true)
      : `aside-menu-item hover:text-slate-300`,
  ].join(" ");

  return (
    <li>
      {item.href && (
        <Link
          to={item.href}
          target={item.target}
          className={componentClass}
        >
          {asideMenuItemInnerContents}
        </Link>
      )}
    </li>
  );
};

export default AsideMenuItem;

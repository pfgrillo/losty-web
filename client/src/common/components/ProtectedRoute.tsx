import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { AuthState } from "../../store/features/authSlice";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavBarItemPlain from "./NavBar/Item/Plain";
import { MenuAsideItem, MenuNavBarItem } from "../../models/MenuItems";
import { RiMenuFoldLine, RiMenuUnfoldLine, RiMenuLine } from "react-icons/ri";
import { MdOutlineAccountCircle, MdOutlineLogout, MdOutlineTravelExplore } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import Sidebar from "./Sidebar";
import { fetchUser } from "../../features/user/services/user.service";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/features/userSlice";


const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    label: 'Explore',
    icon: MdOutlineTravelExplore,
  },
  {
    href: '/Messages',
    icon: HiOutlineMail,
    label: 'Messages',
  },
];

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: <MdOutlineAccountCircle size={24} className="text-black" />,
        label: 'My Profile',
        href: '/profile',
      },
      {
        isDivider: true,
      },
      {
        icon: <MdOutlineLogout size={24} className="text-black" />,
        label: 'Log Out',
        isLogout: true,
      },
    ],
  }
];

const ProtectedRoute: React.FC<{ redirectPath?: string, children?: JSX.Element }> = ({ redirectPath = '/login', children }) => {
  const loggedIn = useAppSelector((state: { auth: AuthState }) => state.auth.user);
  const token = localStorage.getItem('token');

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);

  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!loggedIn && !token) {
    return <Navigate to={redirectPath} replace />;
  }
  const layoutAsidePadding = 'xl:pl-60';

  return <div className={`overflow-hidden lg:overflow-visible`}>
    <div
      className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}
      pt-10 min-h-screen w-screen transition-position lg:w-auto bg-gray-50`}
    >
      <NavBar
        menu={menuNavBar}
        className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}`}
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
        >
          {isAsideMobileExpanded
            ? <RiMenuFoldLine color="#6366F1" size={24} />
            : <RiMenuUnfoldLine color="#6366F1" size={25} />
          }
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          onClick={() => setIsAsideLgActive(!isAsideLgActive)}
        >
          <RiMenuLine color="#6366F1" size={24} />
        </NavBarItemPlain>
      </NavBar>
      <Sidebar
        isAsideMobileExpanded={isAsideMobileExpanded}
        isAsideLgActive={isAsideLgActive}
        menu={menuAside}
        onAsideLgClose={() => setIsAsideLgActive(!isAsideLgActive)}
      />
      {user ? children : null}
    </div>
  </div>
};

export default ProtectedRoute;

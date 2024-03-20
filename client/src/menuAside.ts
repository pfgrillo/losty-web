import {
  FaUserCircle,
  FaDesktop,
  FaLock,
  FaExclamationCircle,
  FaEdit,
  FaTable,
  FaMobileAlt,
  FaPalette,
} from 'react-icons/fa';
import { MenuAsideItem } from './models/MenuItems';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: FaDesktop,
    label: 'Dashboard',
  },
  {
    href: '/tables',
    label: 'Tables',
    icon: FaTable,
  },
  {
    href: '/forms',
    label: 'Forms',
    icon: FaEdit,
  },
  {
    href: '/responsive',
    label: 'Responsive',
    icon: FaMobileAlt,
  },
  {
    href: '/',
    label: 'Styles',
    icon: FaPalette,
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: FaUserCircle,
  },
  {
    href: '/login',
    label: 'Login',
    icon: FaLock,
  },
  {
    href: '/error',
    label: 'Error',
    icon: FaExclamationCircle,
  }
];

export default menuAside;

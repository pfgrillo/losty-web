import { ReactNode } from 'react'
import UserAvatar from '.'
import { useAppSelector } from '../../../hooks/storeHook'
import { UserState } from '../../../store/features/userSlice'

type Props = {
  className?: string
  children?: ReactNode
}

const CurrentUser = ({ className = '', children }: Props) => {
  const username = useAppSelector((state: { user: UserState }) => state.user.username);

  return username
    ? <UserAvatar username={username} className={className}>
      {children}
    </UserAvatar>
    : null;

}

export default CurrentUser;

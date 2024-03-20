

import { ReactNode } from 'react'
import userAvatar from '../../../assets/user-avatar.svg'

type Props = {
  username: string
  className?: string
  children?: ReactNode
}

const UserAvatar = ({
  username,
  className = '',
  children,
}: Props) => {
  return (
    <div className={className}>
      <div className='bg-indigo-500 text-white rounded-full flex items-center justify-center w-full h-full'>
        {username?.substring(0)[0]?.toUpperCase()}
      </div>
      {/* <img
        src={userAvatar}
        alt={username}
        className="rounded-full block h-auto w-full max-w-full bg-indigo-200"
      /> */}
      {children}
    </div>
  )
}

export default UserAvatar;

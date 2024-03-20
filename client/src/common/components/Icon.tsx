import { ReactNode } from 'react';

type Props = {
  icon: React.ElementType;
  w?: string;
  h?: string;
  size?: string | number | null;
  color?: string;
  className?: string;
  children?: ReactNode;
}

const Icon = ({
  icon: IconComponent,
  w = 'w-6',
  h = 'h-6',
  size = null,
  color,
  className = '',
  children,
}: Props) => {

  return (
    <div className={`inline-flex justify-center items-center ${className}`}>
      <IconComponent size={size} color={color} />
      {children}
    </div>
  )
}

export default Icon;

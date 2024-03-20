import { ReactNode } from 'react';

type Props = {
  noPadding?: boolean;
  className?: string;
  children?: ReactNode;
}

const CardBody = ({ noPadding = false, className, children }: Props) => {
  return <div className={`flex flex-col flex-1 ${noPadding ? '' : 'p-3'} ${className}`}>{children}</div>
}

export default CardBody;
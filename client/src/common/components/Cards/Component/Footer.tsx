import { ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
}

const CardBoxComponentFooter = ({ className, children }: Props) => {
  return <footer className={`${className}`}>{children}</footer>
}

export default CardBoxComponentFooter;

import React, { ReactNode } from 'react';
import CardBoxComponentBody from './Component/Body';
import CardBoxComponentFooter from './Component/Footer';
import CardBoxComponentTitle from './Component/Title';

type Props = {
  rounded?: string;
  flex?: string;
  className?: string;
  hasTable?: boolean;
  isHoverable?: boolean;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  minWidth?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const CardBox = ({
  rounded = 'rounded-md',
  flex = 'flex-col',
  className = '',
  hasTable = false,
  isHoverable = false,
  title,
  children,
  footer,
  minWidth,
  onClick,
}: Props) => {
  const componentClass = [
    'bg-indigo-100 flex flex-1',
    'shadow-xl',
    'cursor-pointer',
    className,
    rounded,
    flex,
    minWidth !== '' ?? `min-w-[${minWidth}]`,
  ]

  if (isHoverable) {
    componentClass.push('hover:shadow-lg transition-shadow duration-500');
  }

  return React.createElement(
    'div',
    { className: componentClass.join(' '), onClick },
    <>
      {title && <CardBoxComponentTitle title={title} />}
      <CardBoxComponentBody noPadding={hasTable}>{children}</CardBoxComponentBody>
      {footer && <CardBoxComponentFooter>{footer}</CardBoxComponentFooter>}
    </>
  )
}

export default CardBox;

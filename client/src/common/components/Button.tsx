import React from 'react';
import { ColorButtonKey, getButtonColor } from '../../colors';
import { Link } from 'react-router-dom';
import Icon from './Icon';

type Props = {
  label?: string;
  href?: string;
  target?: string;
  type?: string;
  color?: ColorButtonKey;
  icon?: React.ElementType;
  iconSize?: string | number;
  iconColor?: string;
  className?: string;
  asAnchor?: boolean;
  small?: boolean;
  outline?: boolean;
  active?: boolean;
  disabled?: boolean;
  roundedFull?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const Button = ({
  label,
  href,
  target,
  type,
  color = 'white',
  icon,
  iconSize,
  iconColor,
  className = '',
  asAnchor = false,
  small = false,
  outline = false,
  active = false,
  disabled = false,
  roundedFull = false,
  onClick,
}: Props) => {
  const componentClass = [
    'inline-flex',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
    'focus:outline-none',
    'transition-colors',
    'focus:ring',
    'duration-150',
    'border',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    roundedFull ? 'rounded-full' : 'rounded',
    getButtonColor(color, outline, !disabled, active),
    className,
  ]

  if (!label && icon) {
    componentClass.push('p-1.5')
  } else if (small) {
    componentClass.push('text-sm', roundedFull ? 'px-3 py-1' : 'p-1')
  } else {
    componentClass.push('py-2', roundedFull ? 'px-6' : 'px-3')
  }

  if (disabled) {
    componentClass.push(outline ? 'opacity-50' : 'opacity-70');
  }

  const componentClassString = componentClass.join(' ');

  const componentChildren = (
    <>
      {icon && <Icon icon={icon} size={iconSize} color={iconColor}/>}
      {label && <span className={small ? 'px-1' : 'px-2'}>{label}</span>}
    </>
  )

  if (href && !disabled) {
    return (
      <Link to={href} target={target} className={componentClassString}>
        {componentChildren}
      </Link>
    )
  }

  return React.createElement(
    asAnchor ? 'a' : 'button',
    { className: componentClassString, type: type ?? 'button', target, disabled, onClick },
    componentChildren
  )
}

export default Button;
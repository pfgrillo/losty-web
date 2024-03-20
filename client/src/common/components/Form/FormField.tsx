import { Children, ReactElement, ReactNode, cloneElement } from 'react';

type Props = {
  label?: string;
  id: string;
  icons?: string[] | null[];
  fullSize?: boolean;
  children: ReactNode;
}

const FormField = ({
  icons = [],
  label,
  id,
  fullSize = false,
  children
}: Props) => {
  const childrenCount = Children.count(children);

  let elementWrapperClass = '';

  switch (childrenCount) {
    case 2:
      elementWrapperClass = 'w-auto';
      break;
    case 3:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-3';
      break;
  }

  return (
    <div className={`mb-2 last:mb-0 min-w-[200px] ${fullSize ? 'w-full' : ''}`}>
      <div className='text-l text-bold mb-1'>{label}</div>
      <div className={`${elementWrapperClass}`}>
        {Children.map(children, (child: ReactNode, index) => (
          <div className="relative rounded-md">
            {cloneElement(child as ReactElement, {
              className: 'block w-full',
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormField;

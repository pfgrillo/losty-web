import { ReactNode } from 'react';

type Props = {
  title: string;
  children?: ReactNode;
}

const CardBoxComponentTitle = ({ title, children }: Props) => {
  return (
    <div className="flex items-start justify-around p-3">
      <h1 className="text-lg font-semibold text-black">{title}</h1>
      {children}
    </div>
  )
}

export default CardBoxComponentTitle;

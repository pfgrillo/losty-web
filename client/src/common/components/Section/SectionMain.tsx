import { ReactNode } from 'react';

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto';

type Props = {
  children: ReactNode;
}

const SectionMain = ({ children }: Props) => {
  return <section className={`p-6 ${containerMaxW}`}>{children}</section>
}

export default SectionMain;

type Props = {
  navBar?: boolean;
}

const Divider = ({ navBar = false }: Props) => {
  const classAddon = navBar
    ? 'hidden lg:block lg:my-0.5'
    : 'my-6 -mx-6';

  return <hr className={`${classAddon} border-t border-indigo-500`} />
}

export default Divider;

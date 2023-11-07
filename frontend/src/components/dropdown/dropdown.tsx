import { ReactNode } from 'react';

interface DropdownInterface extends React.ComponentPropsWithoutRef<'div'> {
  openDropdown: Boolean;
  children: ReactNode;
}

const Dropdown = ({
  openDropdown,
  children,
  ...attributes
}: DropdownInterface) => {
  return openDropdown && <div {...attributes}>{children}</div>;
};

export default Dropdown;

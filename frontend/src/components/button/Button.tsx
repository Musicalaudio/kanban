// import React from 'react';
import { ReactNode } from 'react';

interface buttonProps extends React.ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
}

const Button = ({ children, ...attributes }: buttonProps) => {
  return <button {...attributes}>{children}</button>;
};

export default Button;

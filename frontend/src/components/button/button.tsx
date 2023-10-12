import { ReactNode } from 'react';

interface buttonProps {
  children: ReactNode;
  /*maybe include icon image to pass to button or should we do this by passing a className as
  a variant and creating a pseudoclass for each name*/
}

const Button = ({ children }: buttonProps) => {
  return <button>{children}</button>;
};

export default Button;

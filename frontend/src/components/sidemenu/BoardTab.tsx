import { ReactNode } from 'react';
import Button from '../button/Button';

interface TabProps {
  children: ReactNode;
}

const BoardTab = ({ children }: TabProps) => {
  return <Button>{children}</Button>;
};

export default BoardTab;

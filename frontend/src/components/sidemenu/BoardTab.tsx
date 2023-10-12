import { ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
}

const BoardTab = ({ children }: TabProps) => {
  return <button>{children}</button>;
};

export default BoardTab;

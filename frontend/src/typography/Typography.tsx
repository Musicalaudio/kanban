import { ReactNode } from 'react';

const element = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
};

interface TypographyProps {
  element: string;
  children: ReactNode;
}

const Typography = (props: TypographyProps) => {};

export default Typography;

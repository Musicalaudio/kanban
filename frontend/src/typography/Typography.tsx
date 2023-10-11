import { ReactNode } from 'react';

const tagMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
};

const variantMap = {
  xl: 'heading-xl',
  l: 'heading-l',
  m: 'heading-m',
  s: 'heading-s',
  xs: 'heading-xs',
};

interface TypographyProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  variant: string;
  children: ReactNode;
}

const Typography = ({ tag, variant, children, ...props }: TypographyProps) => {
  const Component = tag ? tagMap[tag as keyof Object] : 'p';
  const variantClass = variant ? variantMap[variant as keyof Object] : '';

  return (
    <Component className={variantClass} {...props}>
      {children}
    </Component>
  );
};

export default Typography;

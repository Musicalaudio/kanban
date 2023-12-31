import { ReactNode } from 'react';

interface TypographyProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  variant: 'xl' | 'l' | 'm' | 's' | 'xs';
  font?: 'base' | 'accent';
  children: ReactNode;
}

/* might have to refactor later to extend JSX.Instrinsic elements or something like that 
so we can get props for things like aria-label*/

const Typography = ({
  tag,
  variant,
  children,
  font = 'base',
  ...props
}: TypographyProps) => {
  const Component = tag;

  return (
    <Component className={`heading-${variant} ff-${font}`} {...props}>
      {children}
    </Component>
  );
};

export default Typography;

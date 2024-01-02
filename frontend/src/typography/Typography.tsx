import { ReactNode } from 'react';

interface TypographyProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  variant:
    | 'heading-xl'
    | 'heading-l'
    | 'heading-m'
    | 'heading-s'
    | 'body-l'
    | 'body-m';
  font?: 'base' | 'accent';
  className?: string;
  children: ReactNode;
}

/* might have to refactor later to extend JSX.Instrinsic elements or something like that 
so we can get props for things like aria-label*/

const Typography = ({
  tag,
  variant,
  children,
  className,
  ...props
}: TypographyProps) => {
  const Component = tag;

  return (
    <Component className={`${variant} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default Typography;

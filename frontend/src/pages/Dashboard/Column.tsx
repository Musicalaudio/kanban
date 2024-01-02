import { ReactNode } from 'react';
import Typography from '../../typography/Typography';

interface props {
  title?: string;
  children?: ReactNode;
  className?: string;
  handleOnDrop: (e: React.DragEvent) => void;
  handleOnDragOver: (e: React.DragEvent) => void;
}

const Column = ({
  title,
  children,
  handleOnDrop,
  handleOnDragOver,
  ...attributes
}: props) => {
  return (
    <section
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      {...attributes}
    >
      <Typography variant="heading-s" tag="h3">
        {title ? title : 'temp'}
      </Typography>
      {children}
    </section>
  );
};

export default Column;

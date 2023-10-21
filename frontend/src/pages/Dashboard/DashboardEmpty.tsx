import Button from '../../components/button/Button';

interface EmptyProps {
  className?: string;
}

const DashboardEmpty = ({ className }: EmptyProps) => {
  return (
    <div className={className}>
      <p>This dashboard is empty. Create a new column to get started.</p>
      <Button>+ Add New Column</Button>
    </div>
  );
};

export default DashboardEmpty;

import Button from '../../components/button/Button';
import btn from '../../components/button/Button.module.scss';
import Typography from '../../typography/Typography';
import styles from './Dashboard.module.scss';

interface props {
  openEditModal?: Function;
}

const DashboardEmpty = (props: props) => {
  return (
    <div className={styles['dashboard__empty']}>
      <Typography tag="p" variant="heading-l">
        This dashboard is empty. Create a new column to get started.
      </Typography>
      <Button
        onClick={() => props.openEditModal?.(true)}
        className={`${btn['btn']} ${btn['btn__primary--l']}`}
      >
        + Add New Column
      </Button>
    </div>
  );
};

export default DashboardEmpty;

import styles from './Dashboard.module.scss';
import DashboardEmpty from './DashboardEmpty';

const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <DashboardEmpty className={styles.dashboard__empty} />
    </section>
  );
};

export default Dashboard;

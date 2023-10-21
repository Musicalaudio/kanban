import { Outlet } from 'react-router-dom';
import styles from './Authentication.module.scss';
import Guest from './Guest';

const Authentication = () => {
  return (
    <div className={styles.login}>
      <section className={styles.login__guest}>
        <Guest />
      </section>
      <section className={styles.login__account}>
        <Outlet />
      </section>
    </div>
  );
};

export default Authentication;

import { Navigate, Outlet } from 'react-router-dom';
import styles from './Authentication.module.scss';
import useAuthContext from './useAuthContext';
import logo from '../../../assets/logo-dark.svg';
const Authentication = () => {
  const { state } = useAuthContext();

  if (
    localStorage.getItem('loggedIn') &&
    localStorage.getItem('loggedIn') === 'true' &&
    state &&
    state.user != null
  ) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className={styles.login}>
        <section className={styles.login__account}>
          <img src={logo} alt="logo" />
          <Outlet />
        </section>
      </div>
    );
  }
};

export default Authentication;

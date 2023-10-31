import { useEffect } from 'react';
import Header from '../../components/header/Header';
import SideMenu from '../../components/sidemenu/SideMenu';
import Dashboard from '../Dashboard/Dashboard';
import useAuthContext from '../Authentication/useAuthContext';

const Layout = () => {
  const { context, dispatch } = useAuthContext();

  //On mount, set global user state to the value we have stored in local storage for users
  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(localStorage.getItem('user') || '{}'),
    });
  }, []);

  //when user context is updated, also update local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(context));
  }, [context]);

  return (
    <div className="flex">
      <SideMenu />
      <main>
        <Header />
        <Dashboard />
      </main>
    </div>
  );
};

export default Layout;

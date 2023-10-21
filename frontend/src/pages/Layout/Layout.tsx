import { ReactNode } from 'react';
import Header from '../../components/header/Header';
import SideMenu from '../../components/sidemenu/SideMenu';
import Dashboard from '../Dashboard/Dashboard';

const Layout = () => {
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

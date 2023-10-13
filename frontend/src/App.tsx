import './scss/main.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import homeLoader from './pages/homeLoader';
import SideMenu from './components/sidemenu/SideMenu';
import Header from './components/header/Header';
import Dashboard from './pages/Dashboard';
import { Fragment } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    // loader: homeLoader,
    children: [],
  },
]);

function App() {
  return (
    <div className="flex">
      <SideMenu />
      <main>
        <Header />
        <RouterProvider router={router} />{' '}
      </main>
    </div>
  );
}

export default App;

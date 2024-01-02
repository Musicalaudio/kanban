import './scss/main.scss';
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
  createHashRouter,
} from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import Layout from './pages/Layout/Layout';
import { AuthContextProvider } from './context/AuthContext';
import Error404 from './pages/Error/Error404';
import Login from './pages/Authentication/login/Login';
import { loginAction } from './pages/Authentication/login/loginAction';
import Signup from './pages/Authentication/signup/Signup';
import { signupAction } from './pages/Authentication/signup/signupAction';
import authLoader from './pages/Authentication/authLoader';
import { dashboardAction } from './pages/Dashboard/dashboardAction';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return <div>Dang!</div>;
}

const hashRouter = createHashRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Authentication />}>
        <Route index element={<Login />} action={loginAction} />
        <Route index path="login" element={<Login />} action={loginAction} />
        <Route path="signup" element={<Signup />} action={signupAction} />
      </Route>
      <Route
        path="dashboard"
        action={dashboardAction}
        loader={authLoader}
        element={<Layout />}
        ErrorBoundary={ErrorBoundary}
      >
        <Route path=":board" element={<DashboardLayout />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  const themeContext = useContext(ThemeContext);

  return (
    <AuthContextProvider>
      <div className="App" data-theme={themeContext?.theme}>
        <RouterProvider router={hashRouter} />
      </div>
    </AuthContextProvider>
  );
}

export default App;

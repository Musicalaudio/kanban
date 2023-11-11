import './scss/main.scss';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
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

console.log(`VITE: ${import.meta.env.VITE_SERVER}`);
console.log(`PROCESS: ${process.env.VITE_SERVER}`);

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return <div>Dang!</div>;
}
console.log(import.meta.env.VITE_SERVER);
const router = createBrowserRouter(
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
      />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;

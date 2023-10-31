import './scss/main.scss';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './pages/Layout/Layout';
import { AuthContextProvider } from './context/AuthContext';
import Error404 from './pages/Error/Error404';
import Login from './pages/Authentication/login/Login';
import { loginAction } from './pages/Authentication/login/loginAction';
import Signup from './pages/Authentication/signup/Signup';
import { signupAction } from './pages/Authentication/signup/signupAction';
import authLoader from './pages/Authentication/authLoader';

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
        loader={authLoader}
        element={<Layout />}
        errorElement={<>Error</>}
      >
        <Route index element={<Dashboard />}></Route>
      </Route>
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

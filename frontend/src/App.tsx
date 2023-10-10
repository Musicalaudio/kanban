import '../scss/main.scss';
import { createBrowserRouter, RouteProvider } from 'react-router-dom';
import Home from './pages/Home';
import homeLoader from './pages/homeLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
    children: [],
  },
]);

function App() {
  return <h1>hello world</h1>;
}

export default App;

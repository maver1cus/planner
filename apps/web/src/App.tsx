import { Link, Outlet } from 'react-router-dom';
import { Counter } from "./components/complex";
import { RouteEnum } from './routes';

import './styles/index.scss';

export const App = () => (
  <div className="app">
    <div>
      <Link to={RouteEnum.home}>Home</Link>
      <Link to={RouteEnum.about}>About</Link>
    </div>
    <Counter />
    <Outlet />
  </div>
)

import { Counter } from 'components/complex';
import { AppRouter } from "providers/AppRouter";
import { Navbar } from "components/ui";
import EditIcon from 'assets/icons/edit.svg';

import './styles/index.scss';

export const App = () => (
  <div className="app">
    <Navbar />
    <EditIcon />
    <Counter />
    <AppRouter />
  </div>
)

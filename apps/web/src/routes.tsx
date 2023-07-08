import { HomePage, AboutPage } from './pages';
import { App } from './App';
import type { RouteObject } from 'react-router-dom';

export enum RouteEnum {
  home = '/',
  about = '/about',
}

export const ROUTES: RouteObject[] = [
  {
    path: '',
    element: <App />,
    children: [
      {
        path: RouteEnum.home,
        element: <HomePage />,
      },
      {
        path: RouteEnum.about,
        element: <AboutPage />,
      },
    ],
  },
];

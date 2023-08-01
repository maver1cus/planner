import React from 'react';
import { type FC } from 'react';
import { Navbar } from 'components/ui';
import { AppRouter } from 'providers/AppRouter';

import './styles/index.scss';

export const App: FC = () => (
  <div className="app">
    <Navbar />
    <AppRouter />
  </div>
);

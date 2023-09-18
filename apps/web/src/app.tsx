import React, { type FC } from 'react';
import { Navbar } from 'components/ui';
import { AppRouter } from 'providers/app-router';

import './styles/index.scss';

export const App: FC = () => (
  <div className="app">
    <Navbar />
    <AppRouter />
  </div>
);

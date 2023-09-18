import React, { type FC } from 'react';
import { routeConfig } from 'providers/app-router/route-config';
import { Route, Routes } from 'react-router-dom';

export const AppRouter: FC = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

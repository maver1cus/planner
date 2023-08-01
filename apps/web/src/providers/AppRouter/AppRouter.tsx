import { type FC } from 'react';
import React from 'react';
import { routeConfig } from 'providers/AppRouter/routeConfig';
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

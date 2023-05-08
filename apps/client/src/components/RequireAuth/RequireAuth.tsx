import React, { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/use-typed-selector';
// eslint-disable-next-line import/namespace
import { RouteNames } from '../../router';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  const location = useLocation();

  if (!isAuth) {
    return (
      <Navigate to={RouteNames.LOGIN} state={{ from: location }} replace />
    );
  }

  return children;
};

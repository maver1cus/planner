import React, { useEffect } from 'react';
import { Layout } from 'components/Layout';
import { RequireAuth } from 'components/RequireAuth/RequireAuth';
import { Route, Routes } from 'react-router-dom';
import { useActions } from './hooks/use-actions';
import LoginPage from './pages/login-page/login-page';
import MainPage from './pages/main-page/main-page';
import RegistrationPage from './pages/registration-page/registration-page';
import { storage } from './utils/storage';
import { RouteNames } from './router';

export const App = () => {
  const { setUser, setIsAuth } = useActions();

  useEffect(() => {
    const login = storage.get('login');

    if (login) {
      setUser(login);
      setIsAuth(true);
    }
  }, [setIsAuth, setUser]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={RouteNames.LOGIN} element={<LoginPage />} />
        <Route path={RouteNames.REGISTRATION} element={<RegistrationPage />} />
        <Route
          path={RouteNames.MAIN}
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

import { useLayoutEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { RouteNames } from '../router';
import { storage } from '../utils/storage';
import { useActions } from './use-actions';
import { useTypedSelector } from './use-typed-selector';

export function useAuthCheck() {
  const [init, setInit] = useState(false);
  const match = useMatch(RouteNames.LOGIN);

  let loginRedirect = false;

  const { isAuth } = useTypedSelector((state) => state.auth);
  const { setUser } = useActions();

  useLayoutEffect(() => {
    if (!init && !isAuth) {
      const login = storage.get('login');

      if (login) {
        setUser(login);
      }

      setInit(true);
    }
  }, [isAuth, init, setUser]);

  const isInitNotAuth = init && !isAuth;

  if (!match && isInitNotAuth) {
    loginRedirect = true;
  }

  return loginRedirect;
}

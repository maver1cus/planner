import { AppDispatch } from '../store';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';

export const saveUser = ( token:string, login: string, dispatch: AppDispatch ): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('login', login);
  localStorage.setItem('auth', 'true');
  dispatch(AuthActionCreators.setUser(login));
  dispatch(AuthActionCreators.setIsAuth(true));
  dispatch(AuthActionCreators.setIsLoading(false));
};

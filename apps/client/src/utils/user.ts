import { AppDispatch } from '../store';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import { storage } from './storage';

export const saveUser = ( token:string, login: string, dispatch: AppDispatch ): void => {
  storage.save('token', token);
  storage.save('login', login);
  dispatch(AuthActionCreators.setUser(login));
  dispatch(AuthActionCreators.setIsAuth(true));
  dispatch(AuthActionCreators.setIsLoading(false));
};

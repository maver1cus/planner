import axios from 'axios';
import { AuthActions, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from './types';
import { AppDispatch } from '../../index';
import { saveUser } from '../../../utils/user';
import UserService from '../../../api/user.service';

export const AuthActionCreators = {
  setUser: (user: string): SetUserAction => ({type: AuthActions.SET_USER, payload: user}),
  setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActions.SET_AUTH, payload: auth}),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActions.SET_IS_LOADING, payload: loading}),
  setError: (payload: string): SetErrorAction => ({type: AuthActions.SET_ERROR, payload: payload}),
  registration: (loginUser: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await UserService.registration(loginUser, password);
      const { login, token } = response.data;
      saveUser(token, login, dispatch);
    } catch (e) {
      const message = axios.isAxiosError(e) && e.response
        ? e.response.data.message
        : 'Ошибка при регистрации';

      dispatch(AuthActionCreators.setError(message));
      dispatch(AuthActionCreators.setIsLoading(false));
    }
  },
  login: (loginUser: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await UserService.login(loginUser, password);
      const { login, token } = response.data;
      saveUser(token, login, dispatch);
    } catch (e) {
      const message = axios.isAxiosError(e) && e.response
        ? e.response.data.message
        : 'Ошибка при запросе';

      dispatch(AuthActionCreators.setError(message));
      dispatch(AuthActionCreators.setIsLoading(false));
    }
  },
  logout: () => async (dispatch: AppDispatch): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('auth');
    dispatch(AuthActionCreators.setUser(''));
    dispatch(AuthActionCreators.setIsAuth(false));
  }
};

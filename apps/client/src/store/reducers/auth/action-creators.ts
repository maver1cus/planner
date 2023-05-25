import { isAxiosError } from 'axios';
import UserService from '../../../api/user.service';
import { storage } from '../../../utils/storage';
import { saveUser } from '../../../utils/user';
import { AppDispatch } from '../../index';
import {
  AuthActions,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from './types';

export const AuthActionCreators = {
  setUser: (user: string): SetUserAction => ({
    type: AuthActions.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActions.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({
    type: AuthActions.SET_IS_LOADING,
    payload: loading,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActions.SET_ERROR,
    payload: payload,
  }),
  registration:
    (loginUser: string, password: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        const response = await UserService.registration(loginUser, password);
        const { login, token } = response.data;

        saveUser(token, login, dispatch);
      } catch (e) {
        const message =
          isAxiosError(e) && e.response
            ? e.response.data.message
            : 'Ошибка при регистрации';

        dispatch(AuthActionCreators.setError(message));
        dispatch(AuthActionCreators.setIsLoading(false));
      }
    },
  login:
    (loginUser: string, password: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        const response = await UserService.login(loginUser, password);
        const { login, token } = response.data;

        saveUser(token, login, dispatch);
      } catch (e) {
        const message =
          isAxiosError(e) && e.response
            ? e.response.data.message
            : 'Ошибка при запросе';

        dispatch(AuthActionCreators.setError(message));
        dispatch(AuthActionCreators.setIsLoading(false));
      }
    },
  logout:
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
      storage.remove('token');
      storage.remove('login');
      dispatch(AuthActionCreators.setUser(''));
      dispatch(AuthActionCreators.setIsAuth(false));
    },
};

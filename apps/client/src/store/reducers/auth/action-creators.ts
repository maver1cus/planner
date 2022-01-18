import {AuthActions, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import UserService from "../../../api/user.service";
import axios from "axios";

export const AuthActionCreators = {
  setUser: (user: string): SetUserAction => ({type: AuthActions.SET_USER, payload: user}),
  setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActions.SET_AUTH, payload: auth}),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActions.SET_IS_LOADING, payload: loading}),
  setError: (payload: string): SetErrorAction => ({type: AuthActions.SET_ERROR, payload: payload}),
  login: (loginUser: string, password: string) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        const response = await UserService.login(loginUser, password);

        const { login, token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('login', login);
        dispatch(AuthActionCreators.setIsAuth(true));
        dispatch(AuthActionCreators.setIsLoading(false));
      } catch (e) {
        const message = axios.isAxiosError(e) && e.response
          ? e.response.data.message
          : `Ошибка при запросе`;

        dispatch(AuthActionCreators.setError(message));
        dispatch(AuthActionCreators.setIsLoading(false));
      }
    };
  },
  logout: () => {}
}
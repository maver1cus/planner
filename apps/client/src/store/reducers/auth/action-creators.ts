import {IUser} from "../../../models/user.interface";
import {AuthActions, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({type: AuthActions.SET_USER, payload: user}),
  setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActions.SET_AUTH, payload: auth}),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActions.SET_IS_LOADING, payload: loading}),
  setError: (payload: string): SetErrorAction => ({type: AuthActions.SET_ERROR, payload: payload}),
  login: () => {},
  logout: () => {}
}
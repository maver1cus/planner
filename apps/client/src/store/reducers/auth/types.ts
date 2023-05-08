export interface AuthState {
  isAuth: boolean;
  user: string;
  isLoading: boolean;
  error: string;
}

export enum AuthActions {
  SET_AUTH = 'SET_AUTH',
  SET_ERROR = 'SET_ERROR',
  SET_USER = 'SET_USER',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

export interface SetAuthAction {
  type: AuthActions.SET_AUTH;
  payload: boolean;
}

export interface SetErrorAction {
  type: AuthActions.SET_ERROR;
  payload: string;
}

export interface SetUserAction {
  type: AuthActions.SET_USER;
  payload: string;
}

export interface SetIsLoadingAction {
  type: AuthActions.SET_IS_LOADING;
  payload: boolean;
}

export type AuthAction =
  | SetAuthAction
  | SetUserAction
  | SetErrorAction
  | SetIsLoadingAction;

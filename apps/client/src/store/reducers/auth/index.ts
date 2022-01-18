import {AuthAction, AuthActions, AuthState} from "./types";

const initialState: AuthState = {
  isAuth: false,
  error: '',
  isLoading: false,
  user: ''
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActions.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false }
    case AuthActions.SET_USER:
      return { ...state, user: action.payload }
    case AuthActions.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    case AuthActions.SET_IS_LOADING:
      return { ...state, isLoading: action.payload }
    default:
      return initialState;
  }
}
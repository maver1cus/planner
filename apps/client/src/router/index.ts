import React from "react";
import LoginPage from "../pages/login-page/login-page";
import MainPage from "../pages/main-page/main-page";
import RegistrationPage from "../pages/registration-page/registration-page";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  REGISTRATION = '/registration',
  LOGIN = '/login',
  MAIN = '/'
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN, exact: true, component: LoginPage},
  {path: RouteNames.REGISTRATION, exact: true, component: RegistrationPage}
]

export const privateRoutes: IRoute[] = [
  {path: RouteNames.MAIN, exact: true, component: MainPage}
]

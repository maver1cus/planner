import React from "react";
import LoginPage from "../pages/login-page/login-page";
import MainPage from "../pages/main-page/main-page";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = '/login',
  MAIN = '/'
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN, exact: true, component: LoginPage}
]

export const privateRoutes: IRoute[] = [
  {path: RouteNames.MAIN, exact: true, component: MainPage}
]

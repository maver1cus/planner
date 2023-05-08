import React from 'react';

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  REGISTRATION = '/registration',
  LOGIN = '/login',
  MAIN = '/',
}

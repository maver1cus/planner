import React, {FC} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {IRoute, privateRoutes, publicRoutes, RouteNames} from '../../router';
import { useTypedSelector } from '../../hooks/use-typed-selector';

const AppRouter: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  return (
    isAuth
      ?
      <Switch>
        {
          privateRoutes.map(({path, exact, component}: IRoute) =>
            (<Route
              path={path}
              exact={exact}
              component={component}
              key={path}
            />)
          )
        }
        <Redirect to={RouteNames.MAIN} />
      </Switch>
      :
      <Switch>
        {
          publicRoutes.map(({path, exact, component}: IRoute) =>
            (<Route
              path={path}
              exact={exact}
              component={component}
              key={path}
            />)
          )
        }
        <Redirect to={RouteNames.LOGIN} />
      </Switch>
  );
};

export default AppRouter;

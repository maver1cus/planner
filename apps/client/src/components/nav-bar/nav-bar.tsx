import { Layout, Menu, Row } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { RouteNames } from '../../router';

import s from './nav-bar.module.css';

export const NavBar: FC = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div className={s.username}>{user}</div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item onClick={logout} key={1}>
                Выйти
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item
              onClick={() => navigate(RouteNames.REGISTRATION)}
              key={1}
            >
              Регистрация
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useTypedSelector} from "../../hooks/use-typed-selector";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../../router";
import s from './nav-bar.module.css'
import {useActions} from "../../hooks/use-actions";

const NavBar: FC = () => {
  const router = useHistory();
  const {isAuth, user} = useTypedSelector(state => state.auth)
  const {logout} = useActions()

  return (
    <Layout.Header>
      <Row justify="end">
        {
          isAuth
            ?
              <>
                <div className={s.username}>{user}</div>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  selectable={false}
                >

                  <Menu.Item
                    onClick={logout}
                    key={1}
                  >
                    Выйти
                  </Menu.Item>

                </Menu>
              </>
            :
              <Menu
                theme="dark"
                mode="horizontal"
                selectable={false}
              >

                <Menu.Item
                  onClick={() => router.push(RouteNames.REGISTRATION)}
                  key={1}
                >
                  Регистрация
                </Menu.Item>

              </Menu>
        }
      </Row>
    </Layout.Header>
  );
};

export default NavBar;
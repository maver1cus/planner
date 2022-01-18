import React, {FC, useState} from 'react';
import {Button, Form, Input} from 'antd';
import s from './login-form.module.css';
import {rulesInput} from "../../utils/rules-input";


const LoginFom: FC = () => {
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form className={s.loginForm}>
      <Form.Item
        label="Имя пользователя"
        name="userLogin"
        rules={[rulesInput.required('Пожалуйста введите имя пользователя')]}
      >
        <Input
          value={userLogin}
          onChange={e => setUserLogin(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[rulesInput.required('Пожалуйста введите пароль')]}
      >
        <Input
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginFom;
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { AppDispatch } from '../../store';
import { rulesInput } from '../../utils/rules-input';

import s from './user-form.module.css';

interface IProps {
  onSubmit: (
    loginUser: string,
    password: string
  ) => (dispatch: AppDispatch) => void;
  textBtn: string;
}

const UserForm: ({ onSubmit }: IProps) => JSX.Element = ({
  onSubmit,
  textBtn,
}: IProps) => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');

  const handlerSubmit = async () => {
    onSubmit(userLogin, password);
  };

  return (
    <Form className={s.userForm} onFinish={handlerSubmit}>
      {error && (
        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
      )}
      <Form.Item
        label="Имя пользователя"
        name="userLogin"
        rules={[rulesInput.required('Пожалуйста введите имя пользователя')]}
      >
        <Input
          value={userLogin}
          onChange={(e) => setUserLogin(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {textBtn}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;

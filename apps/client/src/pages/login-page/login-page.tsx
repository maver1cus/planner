import React, { FC } from 'react';

import UserForm from '../../components/user-form/user-form';
import { useActions } from '../../hooks/use-actions';

import s from './login-page.module.css';

const LoginPage: FC = () => {
  const { login } = useActions();

  return (
    <div className={s.wrapper}>
      <UserForm onSubmit={login} textBtn="Войти" />
    </div>
  );
};

export default LoginPage;

import React, {FC} from 'react';
import LoginForm from '../../components/login-fom/login-form';
import s from './login-page.module.css';

const LoginPage: FC = () => (
  <div className={s.wrapper}>
    <LoginForm />
  </div>
);

export default LoginPage;

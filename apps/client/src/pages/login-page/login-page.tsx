import React, {FC} from 'react';
import LoginFom from '../../components/login-fom/login-fom';
import s from './login-page.module.css'

const LoginPage: FC = () => {
  return (
    <div className={s.wrapper}>
      <LoginFom />
    </div>
  );
};

export default LoginPage;
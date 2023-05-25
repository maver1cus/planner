import React, { FC } from 'react';
import UserForm from '../../components/user-form/user-form';
import { useActions } from '../../hooks/use-actions';

import s from './registration-page.module.css';

const RegistrationPage: FC = () => {
  const { registration } = useActions();

  return (
    <div className={s.wrapper}>
      <UserForm onSubmit={registration} textBtn="Зарегистрироваться" />
    </div>
  );
};

export default RegistrationPage;

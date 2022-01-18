import React, {FC} from 'react';
import RegistrationForm from "../../components/registration-form/registration-form";
import s from './registration-page.module.css'

const RegistrationPage: FC = () => {
  return (
    <div className={s.wrapper}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
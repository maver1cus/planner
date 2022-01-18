import React, {FC, useState} from 'react';
import {Button, Form, Input} from 'antd';
import s from './registration-form.module.css';
import {rulesInput} from "../../utils/rules-input";
import {useActions} from "../../hooks/use-actions";
import {useTypedSelector} from "../../hooks/use-typed-selector";


const RegistrationForm: FC = () => {
  const { error, isLoading } = useTypedSelector(state => state.auth)
  const [ userLogin, setUserLogin ] = useState('');
  const [ password, setPassword ] = useState('');

  const { registration } = useActions()
  const submit = async () => {
    registration(userLogin, password);
  }

  return (
    <Form
      className={s.loginForm}
      onFinish={submit}
    >
      { error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div> }
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
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import AppRouter from './components/app-router/app-router';
import NavBar from './components/nav-bar/nav-bar';
import { useActions } from './hooks/use-actions';

function App(): JSX.Element {
  const { setUser, setIsAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser(localStorage.getItem('login') || '');
      setIsAuth(true);
    }
  }, [setIsAuth, setUser]);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <NavBar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
}

export default App;

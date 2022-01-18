import React from 'react';
import { Layout } from 'antd'
import AppRouter from "./components/app-router/app-router";
import NavBar from "./components/nav-bar/nav-bar";

function App() {
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

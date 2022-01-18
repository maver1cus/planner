import React from 'react';
import { Layout } from 'antd'
import AppRouter from "./components/app-router/app-router";

function App() {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
}

export default App;

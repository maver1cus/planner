import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../nav-bar';

export const Layout = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <NavBar />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </div>
  );
};

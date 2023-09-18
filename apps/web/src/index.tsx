import React from 'react';
import { App } from 'app';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

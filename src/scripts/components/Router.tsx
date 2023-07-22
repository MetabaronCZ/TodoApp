import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from 'modules/routes';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.component} key={route.id} />
      ))}
    </Routes>
  </BrowserRouter>
);

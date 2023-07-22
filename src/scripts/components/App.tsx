import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Router } from './Router';
import { GlobalStyles } from './GlobalStyles';

import { theme } from 'modules/theme';

export const App: React.FC = () => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);

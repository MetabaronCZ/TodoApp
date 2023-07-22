import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { Router } from './Router';
import { GlobalStyles } from './GlobalStyles';

import { store } from 'store';
import { theme } from 'modules/theme';

export const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

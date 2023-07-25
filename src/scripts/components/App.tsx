import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { Router } from './Router';
import { GlobalStyles } from './GlobalStyles';
import { Initialization } from 'components/Initialization';

import { store } from 'store';
import { theme } from 'modules/theme';

export const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <Initialization>
          <Router />
        </Initialization>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

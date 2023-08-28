import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from 'modules/theme';

export const withMockedProviders = (
  component: React.ReactNode,
): JSX.Element => (
  <ThemeProvider theme={theme}>
    <MemoryRouter>{component}</MemoryRouter>
  </ThemeProvider>
);

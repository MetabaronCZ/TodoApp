import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { theme as defaultTheme } from 'modules/theme';

interface WithMockedProvidersConfig {
  theme?: DefaultTheme | null;
  url?: string | null;
}

export const withMockedProviders = (
  component: React.ReactNode,
  config: WithMockedProvidersConfig = {},
): JSX.Element => (
  <ThemeProvider theme={config.theme ?? defaultTheme}>
    <MemoryRouter initialEntries={[config.url ?? '/']}>
      {component}
    </MemoryRouter>
  </ThemeProvider>
);

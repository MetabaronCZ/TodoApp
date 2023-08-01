import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import type { Preview } from '@storybook/react';

import { theme } from '../src/scripts/modules/theme';
import { GlobalStyles } from '../src/scripts/components/GlobalStyles';

// init localization
import '../src/scripts/localization';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Colors',
          'Typography',
          'Icos',
          'Common',
          'Grid',
          'Forms',
          'Layout',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
};

export default preview;

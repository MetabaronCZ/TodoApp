import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../src/scripts/modules/theme';
import { GlobalStyles } from '../src/scripts/components/GlobalStyles';

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
        order: ['Common', 'Forms'],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;

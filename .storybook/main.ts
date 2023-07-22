import path from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';

const pathSrc = path.resolve(__dirname, '../src/scripts/');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ['../src/static'],
  webpackFinal: async (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...(config.module?.rules || []),
        {
          test: /\.tsx?$/,
          use: [{ loader: 'ts-loader' }],
          include: pathSrc,
        },
      ],
    },
    resolve: {
      ...config.resolve,
      modules: [...(config.resolve?.modules || []), pathSrc],
    },
  }),
};

export default config;

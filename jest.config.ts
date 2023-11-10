import type { Config } from 'jest';

const config: Config = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.tsx'],
  testMatch: ['**/*.test.ts?(x)'],
  rootDir: './src/scripts',
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/../../coverage',
  clearMocks: true,
};

export default config;

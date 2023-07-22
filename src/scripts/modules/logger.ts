import { ENV } from './env';

/* eslint-disable no-console */
export const Logger = {
  log: (...args: unknown[]) => ENV.isDev && console.log(...args),
  error: (...args: unknown[]) => ENV.isDev && console.error(...args),
};

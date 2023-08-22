import { Env } from './env';

/* eslint-disable no-console */
export const Logger = {
  log: (...args: unknown[]) => Env.isDev() && console.log(...args),
  error: (...args: unknown[]) => Env.isDev() && console.error(...args),
};

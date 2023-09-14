import { describe, expect, it, jest } from '@jest/globals';

import { Env } from 'modules/env';
import { Logger } from 'modules/logger';

// mock Env module
jest.mock('modules/env');

describe('modules/logger', () => {
  describe('log()', () => {
    it('should not be called when not on DEV', () => {
      const log = jest.spyOn(console, 'log');
      log.mockImplementation(() => null);
      expect(log).not.toBeCalled();

      const isDev = jest.mocked(Env.isDev);
      isDev.mockReturnValue(false);
      Logger.log('test');
      expect(log).not.toBeCalled();
    });

    it('should pass all arguments on DEV', () => {
      const log = jest.spyOn(console, 'log');
      log.mockImplementation(() => null);
      expect(log).not.toBeCalled();

      const isDev = jest.mocked(Env.isDev);
      isDev.mockReturnValue(true);
      Logger.log('test', 3, true);
      expect(log).toBeCalledTimes(1);
      expect(log).lastCalledWith('test', 3, true);
    });
  });

  describe('error()', () => {
    it('should not be called when not on DEV', () => {
      const error = jest.spyOn(console, 'error');
      error.mockImplementation(() => null);
      expect(error).not.toBeCalled();

      const isDev = jest.mocked(Env.isDev);
      isDev.mockReturnValue(false);
      Logger.error('test');
      expect(error).not.toBeCalled();
    });

    it('should pass all arguments on DEV', () => {
      const error = jest.spyOn(console, 'error');
      error.mockImplementation(() => null);
      expect(error).not.toBeCalled();

      const isDev = jest.mocked(Env.isDev);
      isDev.mockReturnValue(true);
      Logger.error('test', 3, true);
      expect(error).toBeCalledTimes(1);
      expect(error).lastCalledWith('test', 3, true);
    });
  });
});

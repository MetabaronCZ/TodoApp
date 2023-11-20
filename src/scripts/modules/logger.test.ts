import { describe, expect, it, vi } from 'vitest';

import { Env } from 'modules/env';
import { Logger } from 'modules/logger';

// mock Env module
vi.mock('modules/env');

describe('modules/logger', () => {
  describe('log()', () => {
    it('should not be called when not on DEV', () => {
      const log = vi.spyOn(console, 'log');
      log.mockImplementation(() => null);
      expect(log).not.toBeCalled();

      const isDev = vi.mocked(Env.isDev);
      isDev.mockReturnValue(false);
      Logger.log('test');
      expect(log).not.toBeCalled();
    });

    it('should pass all arguments on DEV', () => {
      const log = vi.spyOn(console, 'log');
      log.mockImplementation(() => null);
      expect(log).not.toBeCalled();

      const isDev = vi.mocked(Env.isDev);
      isDev.mockReturnValue(true);
      Logger.log('test', 3, true);
      expect(log).toBeCalledTimes(1);
      expect(log).lastCalledWith('test', 3, true);
    });
  });

  describe('error()', () => {
    it('should not be called when not on DEV', () => {
      const error = vi.spyOn(console, 'error');
      error.mockImplementation(() => null);
      expect(error).not.toBeCalled();

      const isDev = vi.mocked(Env.isDev);
      isDev.mockReturnValue(false);
      Logger.error('test');
      expect(error).not.toBeCalled();
    });

    it('should pass all arguments on DEV', () => {
      const error = vi.spyOn(console, 'error');
      error.mockImplementation(() => null);
      expect(error).not.toBeCalled();

      const isDev = vi.mocked(Env.isDev);
      isDev.mockReturnValue(true);
      Logger.error('test', 3, true);
      expect(error).toBeCalledTimes(1);
      expect(error).lastCalledWith('test', 3, true);
    });
  });
});

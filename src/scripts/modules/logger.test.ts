import { describe, expect, it, jest } from '@jest/globals';

import { Env } from 'modules/env';
import { Logger } from 'modules/logger';

// mock Env module
jest.mock('modules/env');
const isDev = jest.mocked(Env.isDev);

describe('modules/logger', () => {
  describe('log()', () => {
    it('should not be called when not on DEV', async () => {
      const log = jest.spyOn(console, 'log');
      expect(log.mock.calls.length).toEqual(0);

      isDev.mockReturnValue(false);
      Logger.log('test');
      expect(log.mock.calls.length).toEqual(0);
    });

    it('should pass all arguments on DEV', async () => {
      const log = jest.spyOn(console, 'log');
      expect(log.mock.calls.length).toEqual(0);

      isDev.mockReturnValue(true);
      Logger.log('test', 3, true);
      expect(log.mock.calls.length).toEqual(1);
      expect(log.mock.calls[0]).toEqual(['test', 3, true]);
    });
  });

  describe('error()', () => {
    it('should not be called when not on DEV', async () => {
      const error = jest.spyOn(console, 'error');
      expect(error.mock.calls.length).toEqual(0);

      isDev.mockReturnValue(false);
      Logger.error('test');
      expect(error.mock.calls.length).toEqual(0);
    });

    it('should pass all arguments on DEV', async () => {
      const error = jest.spyOn(console, 'error');
      expect(error.mock.calls.length).toEqual(0);

      isDev.mockReturnValue(true);
      Logger.error('test', 3, true);
      expect(error.mock.calls.length).toEqual(1);
      expect(error.mock.calls[0]).toEqual(['test', 3, true]);
    });
  });
});

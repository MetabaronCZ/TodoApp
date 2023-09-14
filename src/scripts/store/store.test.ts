import { describe, expect, it, jest } from '@jest/globals';
import { useSelector } from 'react-redux';

import { AppState } from 'store';
import { useAppSelector } from 'store/utils';

jest.mock('react-redux');

describe('store', () => {
  describe('useAppSelector()', () => {
    it('should be an alias for useSelector', () => {
      const mocked = jest.mocked(useSelector);
      expect(mocked).not.toBeCalled();

      const cb = (state: AppState): boolean => state.settings.loading;
      useAppSelector(cb);
      expect(mocked).toBeCalledTimes(1);
      expect(mocked.mock.calls[0]).toEqual([cb]);
    });
  });
});

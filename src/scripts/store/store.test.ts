import { describe, expect, it, jest } from '@jest/globals';
import { useSelector } from 'react-redux';

import { AppState } from 'store';
import { useAppSelector } from 'store/utils';

jest.mock('react-redux');
const mocked = jest.mocked(useSelector);

describe('store', () => {
  describe('useAppSelector()', () => {
    it('should be an alias for useSelector', () => {
      expect(mocked.mock.calls.length).toEqual(0);

      const cb = (state: AppState): boolean => state.settings.loading;
      useAppSelector(cb);
      expect(mocked.mock.calls.length).toEqual(1);
      expect(mocked.mock.calls[0]).toEqual([cb]);
    });
  });
});

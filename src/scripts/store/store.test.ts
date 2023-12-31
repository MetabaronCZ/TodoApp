import { describe, expect, it, vi } from 'vitest';
import { useSelector } from 'react-redux';

import { AppState } from 'store';
import { useAppSelector } from 'store/utils';

vi.mock('react-redux');

describe('store', () => {
  describe('useAppSelector()', () => {
    it('should be an alias for useSelector', () => {
      const mocked = vi.mocked(useSelector);
      expect(mocked).not.toBeCalled();

      const cb = (state: AppState): boolean => state.settings.loading;
      useAppSelector(cb);
      expect(mocked).toBeCalledTimes(1);
      expect(mocked).lastCalledWith(cb);
    });
  });
});

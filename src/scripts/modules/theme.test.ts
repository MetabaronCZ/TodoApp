import { describe, expect, it } from '@jest/globals';
import { toVU } from 'modules/theme';

describe('modules/theme', () => {
  describe('toVU()', () => {
    it('should convert vertical unit count to CSS pixel value', async () => {
      expect(toVU(0)).toEqual('0px');
      expect(toVU(0.5)).toEqual('5px');
      expect(toVU(1)).toEqual('10px');
      expect(toVU(5)).toEqual('50px');
      expect(toVU(99)).toEqual('990px');
      expect(toVU(-1)).toEqual('-10px');
      expect(toVU(-12.5)).toEqual('-125px');
    });
  });
});

import { t } from 'i18next';
import { describe, expect, it } from 'vitest';

import { getValidations } from 'modules/validations';

const { REQUIRED } = getValidations(t);

describe('modules/validations', () => {
  describe('getValidations()', () => {
    describe('REQUIRED', () => {
      it('should return true for correct values', () => {
        expect(REQUIRED.test('OK')).toBe(true);
        expect(REQUIRED.test('OK OK OK')).toBe(true);
        expect(REQUIRED.test(' ')).toBe(true);
        expect(REQUIRED.test('1')).toBe(true);
        expect(REQUIRED.test('0')).toBe(true);
        expect(REQUIRED.test('true')).toBe(true);
        expect(REQUIRED.test('false')).toBe(true);
      });

      it('should return false for incorrect values', () => {
        expect(REQUIRED.test('')).toBe(false);
      });
    });
  });
});

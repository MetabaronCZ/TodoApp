import { describe, expect, it } from '@jest/globals';
import { hexToRgb } from 'modules/colors';

describe('modules/colors', () => {
  describe('hexToRgb()', () => {
    it('should convert hexadecimal color values', () => {
      expect(hexToRgb('#ffffff')).toEqual('rgb(255, 255, 255)');
      expect(hexToRgb('#abcdef')).toEqual('rgb(171, 205, 239)');
      expect(hexToRgb('#000000')).toEqual('rgb(0, 0, 0)');
    });

    it('should convert shorthand hexa color values', () => {
      expect(hexToRgb('#fff')).toEqual('rgb(255, 255, 255)');
      expect(hexToRgb('#abc')).toEqual('rgb(170, 187, 204)');
      expect(hexToRgb('#000')).toEqual('rgb(0, 0, 0)');
    });

    it('should work without hash', () => {
      expect(hexToRgb('ffffff')).toEqual('rgb(255, 255, 255)');
      expect(hexToRgb('000')).toEqual('rgb(0, 0, 0)');
    });

    it('should return null on invalid color', () => {
      expect(hexToRgb('')).toEqual(null);
      expect(hexToRgb('#')).toEqual(null);
      expect(hexToRgb('0')).toEqual(null);
      expect(hexToRgb('#0')).toEqual(null);
      expect(hexToRgb('00')).toEqual(null);
      expect(hexToRgb('#00')).toEqual(null);
      expect(hexToRgb('0000')).toEqual(null);
      expect(hexToRgb('#0000')).toEqual(null);
      expect(hexToRgb('#uuu')).toEqual(null);
      expect(hexToRgb('#tttuuu')).toEqual(null);
      expect(hexToRgb('12345678')).toEqual(null);
      expect(hexToRgb('#12345678')).toEqual(null);
    });
  });
});

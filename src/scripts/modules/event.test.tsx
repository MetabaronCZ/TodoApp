import { cleanup } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { change, check, click, submit } from 'modules/event';
import {
  mockChangeEvent,
  mockCheckEvent,
  mockClickEvent,
  mockSubmitEvent,
} from 'test/event';

describe('modules/event', () => {
  describe('click()', () => {
    it('should not prevent event default when no callback provided', async () => {
      const fn = click();

      const evt = await mockClickEvent();
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(evt.defaultPrevented).toEqual(false);
    });

    it('should run callback function correctly', async () => {
      const cb = jest.fn();
      const fn = click(cb);

      const evt = await mockClickEvent();
      expect(cb).not.toBeCalled();
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(cb).toBeCalledTimes(1);
      expect(cb).lastCalledWith();
      expect(evt.defaultPrevented).toEqual(true);
    });
  });

  describe('change()', () => {
    it('should call back input element value', async () => {
      // check HTML input
      const cb = jest.fn();
      const fn = change(cb);

      const evt = await mockChangeEvent('test');
      expect(cb).not.toBeCalled();

      fn(evt);
      expect(cb).toBeCalledTimes(1);
      expect(cb).lastCalledWith('test');
    });
  });

  describe('check()', () => {
    it('should call back checkbox :checked state', async () => {
      // checkbox unchecked
      let cb = jest.fn();
      let fn = check(cb);

      let evt = await mockCheckEvent();
      expect(cb).not.toBeCalled();

      fn(evt);
      expect(cb).toBeCalledTimes(1);
      expect(cb).lastCalledWith(true);

      cleanup();

      // checkbox checked
      cb = jest.fn();
      fn = check(cb);

      evt = await mockCheckEvent(true);
      expect(cb).not.toBeCalled();

      fn(evt);
      expect(cb).toBeCalledTimes(1);
      expect(cb).lastCalledWith(false);
    });
  });

  describe('submit()', () => {
    it('should not prevent event default when no callback provided', async () => {
      const fn = submit();

      const evt = await mockSubmitEvent();
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(evt.defaultPrevented).toEqual(false);
    });

    it('should run callback function correctly', async () => {
      const cb = jest.fn();
      const fn = submit(cb);

      const evt = await mockSubmitEvent();
      expect(cb).not.toBeCalled();
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(cb).toBeCalledTimes(1);
      expect(cb).lastCalledWith();
      expect(evt.defaultPrevented).toEqual(true);
    });
  });
});

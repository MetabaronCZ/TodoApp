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
      expect(cb.mock.calls.length).toEqual(0);
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(cb.mock.calls.length).toEqual(1);
      expect(cb.mock.calls[0][0]).toEqual(undefined);
      expect(evt.defaultPrevented).toEqual(true);
    });
  });

  describe('change()', () => {
    it('should call back input element value', async () => {
      // check HTML input
      const cb = jest.fn();
      const fn = change(cb);

      const evt = await mockChangeEvent('test');
      expect(cb.mock.calls.length).toEqual(0);

      fn(evt);
      expect(cb.mock.calls.length).toEqual(1);
      expect(cb.mock.calls[0][0]).toEqual('test');
    });
  });

  describe('check()', () => {
    it('should call back checkbox :checked state', async () => {
      // checkbox unchecked
      let cb = jest.fn();
      let fn = check(cb);

      let evt = await mockCheckEvent();
      expect(cb.mock.calls.length).toEqual(0);

      fn(evt);
      expect(cb.mock.calls.length).toEqual(1);
      expect(cb.mock.calls[0][0]).toEqual(true);

      cleanup();

      // checkbox checked
      cb = jest.fn();
      fn = check(cb);

      evt = await mockCheckEvent(true);
      expect(cb.mock.calls.length).toEqual(0);

      fn(evt);
      expect(cb.mock.calls.length).toEqual(1);
      expect(cb.mock.calls[0][0]).toEqual(false);
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
      expect(cb.mock.calls.length).toEqual(0);
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(cb.mock.calls.length).toEqual(1);
      expect(cb.mock.calls[0][0]).toEqual(undefined);
      expect(evt.defaultPrevented).toEqual(true);
    });
  });
});

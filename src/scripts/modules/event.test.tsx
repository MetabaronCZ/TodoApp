import React, { FormEvent } from 'react';
import { describe, expect, it, jest } from '@jest/globals';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { change, check, click, submit } from 'modules/event';

// utility functions
const createClickEvent = (): Promise<React.MouseEvent> => {
  return new Promise((resolve) => {
    render(<div data-testid="test" onClick={resolve} />);
    fireEvent.click(screen.getByTestId('test'));
  });
};

const createChangeEvent = (
  value: string,
): Promise<React.ChangeEvent<HTMLInputElement>> => {
  return new Promise((resolve) => {
    render(<input data-testid="test" onChange={resolve} />);
    fireEvent.change(screen.getByTestId('test'), { target: { value } });
  });
};

const createCheckEvent = (
  checked = false,
): Promise<React.ChangeEvent<HTMLInputElement>> => {
  return new Promise((resolve) => {
    render(
      <input
        type="checkbox"
        checked={!checked}
        data-testid="test"
        onChange={resolve}
      />,
    );
    fireEvent.click(screen.getByTestId('test'));
  });
};

const createSubmitEvent = (): Promise<FormEvent> => {
  return new Promise((resolve) => {
    render(<form data-testid="test" onSubmit={resolve} />);
    fireEvent.submit(screen.getByTestId('test'));
  });
};

// tests
describe('modules/event', () => {
  describe('click()', () => {
    it('should not prevent event default when no callback provided', async () => {
      const fn = click();

      const evt = await createClickEvent();
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(evt.defaultPrevented).toEqual(false);
    });

    it('should run callback function correctly', async () => {
      const cb = jest.fn();
      const fn = click(cb);

      const evt = await createClickEvent();
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

      const evt = await createChangeEvent('test');
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

      let evt = await createCheckEvent();
      expect(cb.mock.calls.length).toEqual(0);

      fn(evt);
      expect(cb.mock.calls.length).toEqual(1);
      expect(cb.mock.calls[0][0]).toEqual(true);

      cleanup();

      // checkbox checked
      cb = jest.fn();
      fn = check(cb);

      evt = await createCheckEvent(true);
      expect(cb.mock.calls.length).toEqual(0);

      fn(evt);
      expect(cb.mock.calls.length).toEqual(1);
      expect(cb.mock.calls[0][0]).toEqual(false);
    });
  });

  describe('submit()', () => {
    it('should not prevent event default when no callback provided', async () => {
      const fn = submit();

      const evt = await createSubmitEvent();
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(evt.defaultPrevented).toEqual(false);
    });

    it('should run callback function correctly', async () => {
      const cb = jest.fn();
      const fn = submit(cb);

      const evt = await createSubmitEvent();
      expect(cb.mock.calls.length).toEqual(0);
      expect(evt.defaultPrevented).toEqual(false);

      fn(evt);
      expect(cb.mock.calls.length).toEqual(1);
      expect(cb.mock.calls[0][0]).toEqual(undefined);
      expect(evt.defaultPrevented).toEqual(true);
    });
  });
});

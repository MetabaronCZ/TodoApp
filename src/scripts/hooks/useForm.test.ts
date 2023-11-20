import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useForm } from 'hooks/useForm';

describe('hooks/useForm()', () => {
  it('should initialize correctly', () => {
    const { result } = renderHook(() => {
      return useForm({
        initialValues: {
          test: 'OK',
        },
      });
    });
    const { fields, errors } = result.current;
    expect(fields.test).toEqual('OK');
    expect(errors.test).toBeUndefined();
  });

  it('should change field value', async () => {
    const { result } = renderHook(() => {
      return useForm({
        initialValues: {
          x: 1,
          y: 2,
        },
      });
    });
    let { fields, errors } = result.current;
    const { setValue } = result.current;
    expect(fields.x).toEqual(1);
    expect(fields.y).toEqual(2);
    expect(errors.x).toBeUndefined();
    expect(errors.y).toBeUndefined();

    // trigger value change
    await act(() => setValue('x', 10));

    fields = result.current.fields;
    errors = result.current.errors;
    expect(fields.x).toEqual(10);
    expect(fields.y).toEqual(2);
    expect(errors.x).toEqual(null);
    expect(errors.y).toBeUndefined();
  });

  it('should validate field on change', async () => {
    const validationXFn = vi.fn((value: number) => value > 0);
    const validationYFn = vi.fn((value: number) => value > 0);

    const { result } = renderHook(() => {
      return useForm({
        initialValues: {
          x: 1,
          y: 2,
        },
        validations: {
          x: [{ test: validationXFn, message: 'Test error X' }],
          y: [{ test: validationYFn, message: 'Test error Y' }],
        },
      });
    });
    let { fields, errors } = result.current;
    const { setValue } = result.current;
    expect(fields.x).toEqual(1);
    expect(fields.y).toEqual(2);
    expect(errors.x).toBeUndefined();
    expect(errors.y).toBeUndefined();
    expect(validationXFn).not.toBeCalled();
    expect(validationYFn).not.toBeCalled();

    // trigger value change
    await act(() => setValue('x', -1));
    fields = result.current.fields;
    errors = result.current.errors;
    expect(fields.x).toEqual(-1);
    expect(fields.y).toEqual(2);
    expect(errors.x).toEqual('Test error X');
    expect(errors.y).toBeUndefined();
    expect(validationXFn).toBeCalledTimes(1);
    expect(validationXFn).lastCalledWith(-1);
    expect(validationYFn).not.toBeCalled();

    // correct invalid value
    await act(() => setValue('x', 100));
    fields = result.current.fields;
    errors = result.current.errors;
    expect(fields.x).toEqual(100);
    expect(fields.y).toEqual(2);
    expect(errors.x).toEqual(null);
    expect(errors.y).toBeUndefined();
  });

  it('should submit fields', async () => {
    const validationXFn = vi.fn((value: number) => value > 0);
    const validationYFn = vi.fn((value: number) => value > 0);
    const onSubmit = vi.fn();

    const { result } = renderHook(() => {
      return useForm({
        initialValues: {
          x: 1,
          y: 2,
        },
        validations: {
          x: [{ test: validationXFn, message: 'Test error X' }],
          y: [{ test: validationYFn, message: 'Test error Y' }],
        },
        onSubmit,
      });
    });
    expect(validationXFn).not.toBeCalled();
    expect(validationYFn).not.toBeCalled();
    expect(onSubmit).not.toBeCalled();

    // submit data
    await act(() => result.current.submit());

    const { fields, errors } = result.current;
    expect(fields.x).toEqual(1);
    expect(fields.y).toEqual(2);
    expect(errors.x).toEqual(null);
    expect(errors.y).toEqual(null);
    expect(validationXFn).toBeCalledTimes(1);
    expect(validationYFn).toBeCalledTimes(1);

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).lastCalledWith({
      x: 1,
      y: 2,
    });
  });

  it('should not submit on validation error', async () => {
    const validationXFn = vi.fn((value: number) => value > 0);
    const validationYFn = vi.fn((value: number) => value > 0);
    const onSubmit = vi.fn();

    const { result } = renderHook(() => {
      return useForm({
        initialValues: {
          x: 1,
          y: -2, // invalid value
        },
        validations: {
          x: [{ test: validationXFn, message: 'Test error X' }],
          y: [{ test: validationYFn, message: 'Test error Y' }],
        },
        onSubmit,
      });
    });
    expect(validationXFn).not.toBeCalled();
    expect(validationYFn).not.toBeCalled();
    expect(onSubmit).not.toBeCalled();

    // submit data
    await act(() => result.current.submit());

    let { fields, errors } = result.current;
    expect(fields.x).toEqual(1);
    expect(fields.y).toEqual(-2);
    expect(errors.x).toEqual(null);
    expect(errors.y).toEqual('Test error Y');
    expect(validationXFn).toBeCalledTimes(1);
    expect(validationYFn).toBeCalledTimes(1);

    expect(onSubmit).not.toBeCalled();

    // correct invalid data + submit again
    await act(() => result.current.setValue('y', 2));
    await act(() => result.current.submit());

    fields = result.current.fields;
    errors = result.current.errors;
    expect(fields.x).toEqual(1);
    expect(fields.y).toEqual(2);
    expect(errors.x).toEqual(null);
    expect(errors.y).toEqual(null);

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).lastCalledWith({
      x: 1,
      y: 2,
    });
  });

  it('should auto-submit on field change', async () => {
    const onSubmit = vi.fn();

    const { result } = renderHook(() => {
      return useForm({
        initialValues: {
          x: 1,
        },
        autoSubmit: true,
        onSubmit,
      });
    });
    expect(onSubmit).not.toBeCalled();

    // change field value
    await act(() => result.current.setValue('x', 10));
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).lastCalledWith({ x: 10 });
  });
});

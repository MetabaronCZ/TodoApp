import { describe, expect, it, jest } from '@jest/globals';
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

  it('should change field value', () => {
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
    act(() => setValue('x', 10));

    fields = result.current.fields;
    errors = result.current.errors;
    expect(fields.x).toEqual(10);
    expect(fields.y).toEqual(2);
    expect(errors.x).toEqual(null);
    expect(errors.y).toBeUndefined();
  });

  it('should validate field on change', () => {
    const validationXFn = jest.fn((value: number) => value > 0);
    const validationYFn = jest.fn((value: number) => value > 0);

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
    act(() => setValue('x', -1));
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
    act(() => setValue('x', 100));
    fields = result.current.fields;
    errors = result.current.errors;
    expect(fields.x).toEqual(100);
    expect(fields.y).toEqual(2);
    expect(errors.x).toEqual(null);
    expect(errors.y).toBeUndefined();
  });

  it('should submit fields', () => {
    const validationXFn = jest.fn((value: number) => value > 0);
    const validationYFn = jest.fn((value: number) => value > 0);
    const onSubmit = jest.fn();

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
    act(() => result.current.submit());

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

  it('should not submit on validation error', () => {
    const validationXFn = jest.fn((value: number) => value > 0);
    const validationYFn = jest.fn((value: number) => value > 0);
    const onSubmit = jest.fn();

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
    act(() => result.current.submit());

    let { fields, errors } = result.current;
    expect(fields.x).toEqual(1);
    expect(fields.y).toEqual(-2);
    expect(errors.x).toEqual(null);
    expect(errors.y).toEqual('Test error Y');
    expect(validationXFn).toBeCalledTimes(1);
    expect(validationYFn).toBeCalledTimes(1);

    expect(onSubmit).not.toBeCalled();

    // correct invalid data + submit again
    act(() => result.current.setValue('y', 2));
    act(() => result.current.submit());

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

  it('should auto-submit on field change', () => {
    const onSubmit = jest.fn();

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
    act(() => result.current.setValue('x', 10));
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).lastCalledWith({ x: 10 });
  });
});

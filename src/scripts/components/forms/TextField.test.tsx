import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TextField } from 'components/forms/TextField';
import { withMockedProviders } from 'test/component';

describe('components/forms/TextField', () => {
  it('should render text input', () => {
    const { container } = render(
      withMockedProviders(<TextField onChange={() => null} />),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('should render textarea', () => {
    const { container } = render(
      withMockedProviders(<TextField textarea onChange={() => null} />),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  it('should render props', () => {
    const tree = render(
      withMockedProviders(
        <TextField
          value="Content"
          error="Validation error"
          maxLength={50}
          disabled
          onChange={() => null}
        />,
      ),
    );
    expect(tree.container).toMatchSnapshot();

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toEqual('Content');
    expect(input?.maxLength).toEqual(50);
    expect(input?.disabled).toEqual(true);

    expect(tree.getByText('Validation error')).toBeInTheDocument();
  });

  it('should handle value change', () => {
    const onChange = vi.fn();

    const { container } = render(
      withMockedProviders(<TextField onChange={onChange} />),
    );
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();

    if (input) {
      fireEvent.change(input, { target: { value: 'Changed' } });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith('Changed');
    }
  });
});

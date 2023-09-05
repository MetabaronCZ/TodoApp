import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { Checkbox } from 'components/forms/Checkbox';
import { withMockedProviders } from 'test/component';

describe('components/forms/TextField', () => {
  it('should render correctly', () => {
    const { container } = render(
      withMockedProviders(
        <Checkbox label="Label" checked onChange={() => null} />,
      ),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('should render props', () => {
    const { container } = render(
      withMockedProviders(
        <Checkbox label="Label" checked disabled onChange={() => null} />,
      ),
    );
    expect(container).toMatchSnapshot();

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.checked).toEqual(true);
    expect(input?.disabled).toEqual(true);

    const labels = container.querySelectorAll('label');
    expect(labels.length).toEqual(2);
    expect(labels[0].textContent).toEqual('✔');
    expect(labels[1].textContent).toEqual('Label');
  });

  it('should handle value change', () => {
    const onChange = jest.fn();

    const { container } = render(
      withMockedProviders(<Checkbox onChange={onChange} />),
    );
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();

    if (input) {
      fireEvent.click(input);
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(true);
    }
  });
});

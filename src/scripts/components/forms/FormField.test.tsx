import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import * as Dropdown from 'components/forms/Dropdown';
import { FormField } from 'components/forms/FormField';

import { withMockedProviders } from 'test/component';

describe('components/forms/FormField', () => {
  it('should render correctly', () => {
    const { container } = render(
      withMockedProviders(
        <FormField
          label="Label"
          field={{
            type: 'text',
            value: 'Content',
            onChange: () => null,
          }}
        />,
      ),
    );
    expect(container).toMatchSnapshot();

    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label?.textContent).toEqual('Label:');
  });

  it('should render text input', () => {
    const { container } = render(
      withMockedProviders(
        <FormField
          label="Label"
          field={{
            type: 'text',
            value: 'Content',
            onChange: () => null,
          }}
        />,
      ),
    );
    expect(container).toMatchSnapshot();

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toEqual('Content');
  });

  it('should render textarea', () => {
    const { container } = render(
      withMockedProviders(
        <FormField
          label="Label"
          field={{
            type: 'text',
            value: 'Content',
            textarea: true,
            onChange: () => null,
          }}
        />,
      ),
    );
    expect(container).toMatchSnapshot();

    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea?.value).toEqual('Content');
  });

  it('should render dropdown', () => {
    const mockedDropdown = jest.spyOn(Dropdown, 'Dropdown');
    expect(mockedDropdown).toBeCalledTimes(0);

    const { container } = render(
      withMockedProviders(
        <FormField
          label="Label"
          field={{
            type: 'dropdown',
            value: '1',
            options: [{ id: '1', title: 'Item 1', value: '1' }],
            onChange: () => null,
          }}
        />,
      ),
    );
    expect(container).toMatchSnapshot();

    expect(mockedDropdown).toBeCalledTimes(1);
    const props = mockedDropdown.mock.calls[0][0];
    expect(props.items.length).toEqual(1);
  });

  it('should handle text input change', () => {
    const onChange = jest.fn();

    const { container } = render(
      withMockedProviders(
        <FormField
          label="Label"
          field={{
            type: 'text',
            value: 'Content',
            onChange,
          }}
        />,
      ),
    );
    expect(onChange).toBeCalledTimes(0);

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();

    if (input) {
      fireEvent.change(input, { target: { value: 'Changed' } });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith('Changed');
    }
  });

  it('should handle textarea change', () => {
    const onChange = jest.fn();

    const { container } = render(
      withMockedProviders(
        <FormField
          label="Label"
          field={{
            type: 'text',
            value: 'Content',
            textarea: true,
            onChange,
          }}
        />,
      ),
    );
    expect(onChange).toBeCalledTimes(0);

    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();

    if (textarea) {
      fireEvent.change(textarea, { target: { value: 'Changed' } });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith('Changed');
    }
  });

  it('should handle dropdown change', () => {
    const onChange = jest.fn();

    const mockedDropdown = jest.spyOn(Dropdown, 'Dropdown');
    expect(mockedDropdown).toBeCalledTimes(0);

    render(
      withMockedProviders(
        <FormField
          label="Label"
          field={{
            type: 'dropdown',
            value: '1',
            options: [
              { id: '1', title: 'Item 1', value: '1' },
              { id: '2', title: 'Item 2', value: '2' },
              { id: '3', title: 'Item 3', value: '3' },
            ],
            onChange,
          }}
        />,
      ),
    );
    expect(onChange).toBeCalledTimes(0);
    expect(mockedDropdown).toBeCalledTimes(1);

    // trigger Dropdown onChange
    mockedDropdown.mock.calls[0][0].onSelect('Changed');

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('Changed');
  });
});

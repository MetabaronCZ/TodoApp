import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { Paging } from 'components/common/Paging';
import { withMockedProviders } from 'test/component';

describe('components/common/Paging', () => {
  it('should render correctly', () => {
    const onChange = jest.fn();

    const tree = render(
      withMockedProviders(
        <Paging page={11} perPage={10} count={500} onChange={onChange} />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('12')).toBeInTheDocument();
    expect(tree.getAllByRole('button').length).toEqual(2);
  });

  it('should render one page paging', () => {
    const onChange = jest.fn();

    const tree = render(
      withMockedProviders(
        <Paging page={0} perPage={10} count={5} onChange={onChange} />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('1')).toBeInTheDocument();

    const buttons = tree.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');
  });

  it('should render first page', () => {
    const onChange = jest.fn();

    const tree = render(
      withMockedProviders(
        <Paging page={0} perPage={10} count={25} onChange={onChange} />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onChange.mock.calls.length).toEqual(0);

    const buttons = tree.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('disabled');
    expect(buttons[1]).not.toHaveAttribute('disabled');

    fireEvent.click(buttons[1]);
    expect(onChange.mock.calls.length).toEqual(1);
    expect(onChange.mock.calls[0][0]).toEqual(1);
  });

  it('should render last page', () => {
    const onChange = jest.fn();

    const tree = render(
      withMockedProviders(
        <Paging page={2} perPage={10} count={25} onChange={onChange} />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onChange.mock.calls.length).toEqual(0);

    const buttons = tree.getAllByRole('button');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');

    fireEvent.click(buttons[0]);
    expect(onChange.mock.calls.length).toEqual(1);
    expect(onChange.mock.calls[0][0]).toEqual(1);
  });

  it('should render inner page', () => {
    const onChange = jest.fn();

    const tree = render(
      withMockedProviders(
        <Paging page={1} perPage={10} count={25} onChange={onChange} />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onChange.mock.calls.length).toEqual(0);

    const buttons = tree.getAllByRole('button');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).not.toHaveAttribute('disabled');

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(onChange.mock.calls.length).toEqual(2);
    expect(onChange.mock.calls[0][0]).toEqual(0);
    expect(onChange.mock.calls[1][0]).toEqual(2);
  });
});

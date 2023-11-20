import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Paging } from 'components/common/Paging';
import { withMockedProviders } from 'test/component';

describe('components/common/Paging', () => {
  it('should render correctly', () => {
    const onChange = vi.fn();

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
    const onChange = vi.fn();

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
    const onChange = vi.fn();

    const tree = render(
      withMockedProviders(
        <Paging page={0} perPage={10} count={25} onChange={onChange} />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onChange).not.toBeCalled();

    const buttons = tree.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('disabled');
    expect(buttons[1]).not.toHaveAttribute('disabled');

    fireEvent.click(buttons[1]);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).lastCalledWith(1);
  });

  it('should render last page', () => {
    const onChange = vi.fn();

    const tree = render(
      withMockedProviders(
        <Paging page={2} perPage={10} count={25} onChange={onChange} />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onChange).not.toBeCalled();

    const buttons = tree.getAllByRole('button');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');

    fireEvent.click(buttons[0]);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).lastCalledWith(1);
  });

  it('should render inner page', () => {
    const onChange = vi.fn();

    const tree = render(
      withMockedProviders(
        <Paging page={1} perPage={10} count={25} onChange={onChange} />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onChange).not.toBeCalled();

    const buttons = tree.getAllByRole('button');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).not.toHaveAttribute('disabled');

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(onChange).toBeCalledTimes(2);
    expect(onChange).nthCalledWith(1, 0);
    expect(onChange).nthCalledWith(2, 2);
  });
});

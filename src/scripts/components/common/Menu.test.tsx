import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Menu, MenuItem } from 'components/common/Menu';

import { theme } from 'modules/theme';
import { hexToRgb } from 'modules/colors';
import { withMockedProviders } from 'test/component';

describe('components/common/Menu', () => {
  it('should render correctly', () => {
    const testData: MenuItem[] = [{ id: '1', title: 'CONTENT' }];

    const tree = render(withMockedProviders(<Menu items={testData} />));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });

  it('should render nothing when no children', () => {
    const { container } = render(withMockedProviders(<Menu items={[]} />));
    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toEqual('');
  });

  it('should render menu items', () => {
    const testData: MenuItem[] = [
      { id: '1', title: 'Item 1', href: '/test' },
      { id: '2', title: 'Item 2', active: true },
    ];
    const tree = render(withMockedProviders(<Menu items={testData} />));
    expect(tree.container).toMatchSnapshot();

    expect(tree.getByRole('list')).toBeInTheDocument();
    expect(tree.getByText('Item 1')).toBeInTheDocument();
    expect(tree.getByText('Item 2')).toBeInTheDocument();

    expect(tree.getAllByRole('link').length).toEqual(1);
    expect(tree.getByRole('link')).toHaveAttribute('href', '/test');

    expect(tree.getAllByRole('button').length).toEqual(1);
    expect(tree.getByRole('button')).not.toHaveAttribute('href');

    const items = tree.container.querySelectorAll('a, button');

    expect(items[0]).not.toHaveStyle({
      background: hexToRgb(theme.color.active),
    });
    expect(items[1]).toHaveStyle({
      background: hexToRgb(theme.color.active),
    });
  });

  it('should call back onClick event', () => {
    const onClick = vi.fn();
    expect(onClick).not.toBeCalled();

    const testData: MenuItem[] = [{ id: '1', title: 'Item 1', onClick }];
    const tree = render(withMockedProviders(<Menu items={testData} />));

    fireEvent.click(tree.getByRole('button'));
    expect(onClick).toBeCalledTimes(1);
    expect(onClick).lastCalledWith();
  });
});

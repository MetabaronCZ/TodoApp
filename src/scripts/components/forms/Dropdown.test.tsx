import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { Dropdown, DropdownItem } from 'components/forms/Dropdown';
import { withMockedProviders } from 'test/component';

const testItems: DropdownItem<string>[] = [
  { id: '1', title: 'Item 1', value: '1' },
  { id: '2', title: 'Item 2', value: '2' },
  { id: '3', title: 'Item 3', value: '3' },
];

describe('components/forms/Dropdown', () => {
  it('should render correctly', () => {
    const { container } = render(
      withMockedProviders(
        <Dropdown items={testItems} value="1" onSelect={() => null} />,
      ),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('should be open-able', () => {
    const tree = render(
      withMockedProviders(
        <Dropdown items={testItems} value="1" onSelect={() => null} />,
      ),
    );
    expect(tree.queryByRole('list')).not.toBeInTheDocument();

    fireEvent.click(tree.getByRole('button'));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByRole('list')).toBeInTheDocument();

    const items = tree.container.querySelectorAll('ul button');
    expect(items[0].textContent).toEqual('Item 1');
    expect(items[1].textContent).toEqual('Item 2');
    expect(items[2].textContent).toEqual('Item 3');
  });

  it('should be close-able', () => {
    const tree = render(
      withMockedProviders(
        <Dropdown items={testItems} value="1" onSelect={() => null} />,
      ),
    );
    expect(tree.queryByRole('list')).not.toBeInTheDocument();

    // open
    fireEvent.click(tree.getByRole('button'));
    expect(tree.getByRole('list')).toBeInTheDocument();

    // close by clicking the Dropdown button
    fireEvent.click(tree.getAllByRole('button')[0]);
    expect(tree.queryByRole('list')).not.toBeInTheDocument();

    // open
    fireEvent.click(tree.getByRole('button'));
    expect(tree.getByRole('list')).toBeInTheDocument();

    // close by clicking outside Dropdown
    fireEvent.mouseUp(tree.container);
    expect(tree.queryByRole('list')).not.toBeInTheDocument();

    // open
    fireEvent.click(tree.getByRole('button'));
    expect(tree.getByRole('list')).toBeInTheDocument();

    // close by pressing ESC
    fireEvent.keyDown(tree.container, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    expect(tree.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should be disabled', () => {
    const tree = render(
      withMockedProviders(
        <Dropdown items={testItems} value="1" disabled onSelect={() => null} />,
      ),
    );
    expect(tree.queryByRole('list')).not.toBeInTheDocument();

    fireEvent.click(tree.getByRole('button'));
    expect(tree.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should be left-alignable', () => {
    const tree = render(
      withMockedProviders(
        <Dropdown
          items={testItems}
          align="left"
          value="1"
          onSelect={() => null}
        />,
      ),
    );

    fireEvent.click(tree.getByRole('button'));
    expect(tree.getByRole('list')).toBeInTheDocument();
    expect(tree.getByRole('list')).toHaveStyle({ left: 0 });
  });

  it('should be right-alignable', () => {
    const tree = render(
      withMockedProviders(
        <Dropdown
          items={testItems}
          align="right"
          value="1"
          onSelect={() => null}
        />,
      ),
    );

    fireEvent.click(tree.getByRole('button'));
    expect(tree.getByRole('list')).toBeInTheDocument();
    expect(tree.getByRole('list')).toHaveStyle({ right: 0 });
  });

  it('should select items', () => {
    const onSelect = jest.fn();

    const tree = render(
      withMockedProviders(
        <Dropdown items={testItems} value="1" onSelect={onSelect} />,
      ),
    );

    // open Dropdown
    fireEvent.click(tree.getByRole('button'));
    expect(tree.getByRole('list')).toBeInTheDocument();
    expect(onSelect).toBeCalledTimes(0);

    const buttons = tree.getAllByRole('button');
    fireEvent.click(buttons[2]); // click second item

    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith('2');
    expect(tree.queryByRole('list')).not.toBeInTheDocument(); // Dropdown closed
  });
});

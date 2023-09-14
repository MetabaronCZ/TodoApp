import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { Dropdown } from 'components/forms/Dropdown';
import { TodoListToolbar } from 'components/todo-list/TodoListToolbar';

import { withMockedProviders } from 'test/component';

jest.mock('components/forms/Dropdown');

describe('components/todo-list/TodoListToolbar', () => {
  it('should render correctly', () => {
    const { container } = render(
      withMockedProviders(
        <TodoListToolbar
          sort="CREATED_ASC"
          onSort={() => null}
          onSelect={() => null}
          onDelete={() => null}
        />,
      ),
    );
    expect(container).toMatchSnapshot();
  });

  it('should be able to un/select-all', () => {
    const onSelect = jest.fn();

    const { container } = render(
      withMockedProviders(
        <TodoListToolbar
          sort="TITLE_ASC"
          selected
          onSort={() => null}
          onSelect={onSelect}
          onDelete={() => null}
        />,
      ),
    );
    expect(container).toMatchSnapshot();

    const checkbox = container.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    expect(checkbox).toBeInTheDocument();
    expect(checkbox?.checked).toEqual(true);
    expect(onSelect).toBeCalledTimes(0);

    if (checkbox) {
      fireEvent.click(checkbox);
      expect(onSelect).toBeCalledTimes(1);
      expect(onSelect).toBeCalledWith(false);
    }
  });

  it('should not be able to un/select-all when disabled', () => {
    const { container } = render(
      withMockedProviders(
        <TodoListToolbar
          sort="TITLE_ASC"
          selected
          disabled
          onSort={() => null}
          onSelect={() => null}
          onDelete={() => null}
        />,
      ),
    );
    expect(container).toMatchSnapshot();

    const checkbox = container.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    expect(checkbox).toBeInTheDocument();
    expect(checkbox?.disabled).toEqual(true);
  });

  it('should be able to sort items', () => {
    const onSort = jest.fn();

    const mockedDropdown = jest.mocked(Dropdown);
    expect(mockedDropdown).toBeCalledTimes(0);

    const { container } = render(
      withMockedProviders(
        <TodoListToolbar
          sort="TITLE_DESC"
          onSort={onSort}
          onSelect={() => null}
          onDelete={() => null}
        />,
      ),
    );
    expect(container).toMatchSnapshot();

    expect(onSort).toBeCalledTimes(0);
    expect(mockedDropdown).toBeCalledTimes(1);

    const props = mockedDropdown.mock.calls[0][0];
    expect(props.value).toEqual('TITLE_DESC');

    // trigger Dropdown onSelect
    props.onSelect('TITLE_ASC');
    expect(onSort).toBeCalledTimes(1);
    expect(onSort).toBeCalledWith('TITLE_ASC');
  });

  it('should not be able to sort items when disabled', () => {
    const mockedDropdown = jest.mocked(Dropdown);

    const { container } = render(
      withMockedProviders(
        <TodoListToolbar
          sort="TITLE_DESC"
          disabled
          onSort={() => null}
          onSelect={() => null}
          onDelete={() => null}
        />,
      ),
    );
    expect(container).toMatchSnapshot();
    expect(mockedDropdown).toBeCalledTimes(1);

    const props = mockedDropdown.mock.calls[0][0];
    expect(props.disabled).toEqual(true);
  });

  it('should be able to delete selected', () => {
    const onDelete = jest.fn();

    const tree = render(
      withMockedProviders(
        <TodoListToolbar
          sort="TITLE_ASC"
          selected
          onSort={() => null}
          onSelect={() => null}
          onDelete={onDelete}
        />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onDelete).toBeCalledTimes(0);

    const button = tree.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onDelete).toBeCalledTimes(1);
  });

  it('should not be able to delete when nothing selected', () => {
    const onDelete = jest.fn();

    const tree = render(
      withMockedProviders(
        <TodoListToolbar
          sort="TITLE_ASC"
          onSort={() => null}
          onSelect={() => null}
          onDelete={onDelete}
        />,
      ),
    );
    expect(onDelete).toBeCalledTimes(0);
    expect(tree.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should not be able to delete when disabled', () => {
    const onDelete = jest.fn();

    const tree = render(
      withMockedProviders(
        <TodoListToolbar
          sort="TITLE_ASC"
          selected
          disabled
          onSort={() => null}
          onSelect={() => null}
          onDelete={onDelete}
        />,
      ),
    );
    expect(onDelete).toBeCalledTimes(0);
    expect(tree.queryByRole('button')).not.toBeInTheDocument();
  });
});

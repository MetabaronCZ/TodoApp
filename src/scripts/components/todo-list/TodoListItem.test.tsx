import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { TodoListItem } from 'components/todo-list/TodoListItem';

import { Todo } from 'models/Todo';
import { withMockedProviders } from 'test/component';
import { icos } from 'modules/icos';

const testData: Todo = {
  id: 'test123',
  title: 'Test todo',
  description: '',
  created: 0,
  folder: null,
  isDone: true,
};

describe('components/todo-list/TodoListItem', () => {
  it('should render correctly', () => {
    const tree = render(
      withMockedProviders(
        <TodoListItem
          item={testData}
          onSelect={() => null}
          onDelete={() => null}
        />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('Test todo')).toBeInTheDocument();
    expect(tree.getByText('1. 1. 1970')).toBeInTheDocument();
    expect(tree.getByText(icos.success)).toBeInTheDocument();
    expect(tree.getByRole('checkbox')).toBeInTheDocument();
    expect(tree.getByRole('checkbox')).not.toHaveAttribute('checked');
  });

  it('should be selectable', () => {
    const onSelect = jest.fn();

    const tree = render(
      withMockedProviders(
        <TodoListItem
          item={testData}
          selected
          onSelect={onSelect}
          onDelete={() => null}
        />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onSelect).toBeCalledTimes(0);

    const checkbox = tree.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('checked');

    fireEvent.click(checkbox);
    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith(false);
  });

  it('should be delete-able', () => {
    const onDelete = jest.fn();

    const tree = render(
      withMockedProviders(
        <TodoListItem
          item={testData}
          onSelect={() => null}
          onDelete={onDelete}
        />,
      ),
    );
    expect(onDelete).toBeCalledTimes(0);

    const button = tree.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onDelete).toBeCalledTimes(1);
  });
});

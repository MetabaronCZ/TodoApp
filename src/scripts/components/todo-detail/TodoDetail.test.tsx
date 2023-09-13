import React from 'react';
import { t } from 'i18next';
import { Provider } from 'react-redux';

import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import * as Dropdown from 'components/forms/Dropdown';
import * as TodoFields from 'components/todo-detail/TodoFields';
import { TodoDetail } from 'components/todo-detail/TodoDetail';

import { Todo } from 'models/Todo';
import { Folder } from 'models/Folder';
import { client } from 'modules/client';
import { todoFoldersSlice } from 'store/folders';
import { filterTodos } from 'store/todos/actions';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

const { setFolders } = todoFoldersSlice.actions;

const testFoldersData: Folder[] = [
  { id: 'A', title: 'Folder A' },
  { id: 'B', title: 'Folder B' },
  { id: 'C', title: 'Folder C' },
];

const testData: Todo = {
  id: '0',
  title: 'Edited todo',
  description: '',
  isDone: true,
  folder: 'B',
  created: 0,
};

const getTodoDetail = async (
  data?: Todo,
  error?: boolean,
  folder?: string,
): Promise<JSX.Element> => {
  const store = mockStore();
  store.dispatch(setFolders(testFoldersData));

  if (folder) {
    await store.dispatch(filterTodos({ folder }));
  }
  return withMockedProviders(
    <Provider store={store}>
      <TodoDetail data={data} fetchError={error} />
    </Provider>,
  );
};

describe('components/todo-detail/TodoDetail', () => {
  it('should render todo create variant', async () => {
    const fields = jest.spyOn(TodoFields, 'TodoFields');
    expect(fields).toHaveBeenCalledTimes(0);

    const tree = render(await getTodoDetail());
    expect(tree.container).toMatchSnapshot();

    expect(tree.getByText(t('page.todoCreate'))).toBeInTheDocument();
    expect(tree.getByText(t('create'))).toBeInTheDocument();

    expect(fields).toHaveBeenCalledTimes(1);
    expect(fields.mock.calls[0][0].loading).toEqual(false);
    expect(fields.mock.calls[0][0].errors).toEqual({});
    expect(fields.mock.calls[0][0].fields).toEqual({
      title: '',
      description: '',
      isDone: false,
      folder: null,
    });
  });

  it('should render todo detail variant', async () => {
    const fields = jest.spyOn(TodoFields, 'TodoFields');
    expect(fields).toHaveBeenCalledTimes(0);

    const tree = render(await getTodoDetail(testData));
    expect(tree.container).toMatchSnapshot();

    expect(tree.getByText(t('page.todoDetail'))).toBeInTheDocument();
    expect(tree.getByText(t('edit'))).toBeInTheDocument();

    expect(fields).toHaveBeenCalledTimes(1);
    expect(fields.mock.calls[0][0].loading).toEqual(false);
    expect(fields.mock.calls[0][0].errors).toEqual({});
    expect(fields.mock.calls[0][0].fields).toEqual({
      title: 'Edited todo',
      description: '',
      isDone: true,
      folder: 'B',
    });
  });

  it('should render fetch error', async () => {
    const fields = jest.spyOn(TodoFields, 'TodoFields');
    expect(fields).toHaveBeenCalledTimes(0);

    const tree = render(await getTodoDetail(testData, true));
    expect(tree.container).toMatchSnapshot();

    expect(tree.getByText(t('error.detailLoading'))).toBeInTheDocument();
    expect(tree.getByText(t('page.todoDetail'))).toBeInTheDocument();
    expect(tree.queryByRole('button')).not.toBeInTheDocument();

    expect(fields).toHaveBeenCalledTimes(0);
  });

  it('should prefill folder Dropdown when filtered by a folder', async () => {
    const fields = jest.spyOn(TodoFields, 'TodoFields');
    expect(fields).toHaveBeenCalledTimes(0);

    const tree = render(await getTodoDetail(undefined, false, 'C'));
    expect(tree.container).toMatchSnapshot();

    expect(fields).toHaveBeenCalledTimes(1);
    expect(fields.mock.calls[0][0].fields).toEqual({
      title: '',
      description: '',
      isDone: false,
      folder: 'C',
    });
  });

  it('should create todo', async () => {
    const mockedTodoCreate = jest.spyOn(client.todo, 'create');
    const fields = jest.spyOn(TodoFields, 'TodoFields');
    const dropdown = jest.spyOn(Dropdown, 'Dropdown');

    const tree = render(await getTodoDetail());
    expect(mockedTodoCreate).toBeCalledTimes(0);

    const submitButton = tree.getByRole('button', {
      name: (value) => value.includes(t('create')),
    });
    expect(submitButton).toBeInTheDocument();

    // trigger form submit (no title)
    fireEvent.click(submitButton);
    expect(mockedTodoCreate).toBeCalledTimes(0);

    if (fields.mock.lastCall) {
      expect(fields.mock.lastCall[0].errors?.title).toBeTruthy();
    }

    const inputs = tree.container.querySelectorAll('input');
    expect(inputs.length).toEqual(2);

    const [title, isDone] = Array.from(inputs);
    const description = tree.container.querySelector('textarea');

    expect(title).toBeInTheDocument();
    expect(title.value).toEqual('');

    expect(isDone).toBeInTheDocument();
    expect(isDone?.checked).toEqual(false);

    expect(description).toBeInTheDocument();
    expect(description?.value).toEqual('');

    expect(dropdown).toBeCalled();
    expect(dropdown.mock.calls[0][0].value).toEqual('');

    // trigger form submit (validation error)
    fireEvent.click(submitButton);
    expect(mockedTodoCreate).toBeCalledTimes(0);

    if (fields.mock.lastCall) {
      expect(fields.mock.lastCall[0].errors?.title).toBeTruthy();
    }

    // set todo values
    act(() => {
      if (title && isDone && description && dropdown.mock.lastCall) {
        fireEvent.change(title, { target: { value: 'New todo' } });
        fireEvent.change(description, {
          target: { value: 'Some description' },
        });
        fireEvent.click(isDone);
        dropdown.mock.lastCall[0].onSelect('A');
      }
    });

    // trigger form submit (validation OK)
    fireEvent.click(submitButton);

    expect(mockedTodoCreate).toBeCalledWith({
      title: 'New todo',
      description: 'Some description',
      isDone: true,
      folder: 'A',
    });
  });

  it('should edit todo', async () => {
    const mockedTodoEdit = jest.spyOn(client.todo, 'edit');
    const dropdown = jest.spyOn(Dropdown, 'Dropdown');

    const tree = render(await getTodoDetail(testData));
    expect(mockedTodoEdit).toBeCalledTimes(0);

    const submitButton = tree.getByRole('button', {
      name: (value) => value.includes(t('edit')),
    });
    expect(submitButton).toBeInTheDocument();

    const inputs = tree.container.querySelectorAll('input');
    expect(inputs.length).toEqual(2);

    const [title, isDone] = Array.from(inputs);
    const description = tree.container.querySelector('textarea');

    expect(title).toBeInTheDocument();
    expect(title.value).toEqual('Edited todo');

    expect(isDone).toBeInTheDocument();
    expect(isDone?.checked).toEqual(true);

    expect(description).toBeInTheDocument();
    expect(description?.value).toEqual('');

    expect(dropdown).toBeCalled();
    expect(dropdown.mock.calls[0][0].value).toEqual('B');

    // set todo values
    act(() => {
      if (title && isDone && description && dropdown.mock.lastCall) {
        fireEvent.change(title, { target: { value: 'Changed todo' } });
        fireEvent.change(description, {
          target: { value: 'Some description' },
        });
        fireEvent.click(isDone);
        dropdown.mock.lastCall[0].onSelect('C');
      }
    });

    // trigger form submit
    fireEvent.click(submitButton);

    expect(mockedTodoEdit).toBeCalledWith('0', {
      title: 'Changed todo',
      description: 'Some description',
      isDone: false,
      folder: 'C',
    });
  });
});

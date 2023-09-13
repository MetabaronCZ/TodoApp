import React from 'react';
import { Provider } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import * as Dropdown from 'components/forms/Dropdown';
import * as ItemList from 'components/common/ItemList';
import { TodoFields } from 'components/todo-detail/TodoFields';

import { TodoData } from 'models/Todo';
import { Folder } from 'models/Folder';
import { FormErrors } from 'hooks/useForm';
import { todoFoldersSlice } from 'store/folders';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

const { setFolders } = todoFoldersSlice.actions;

const testFoldersData: Folder[] = [
  { id: 'A', title: 'Folder A' },
  { id: 'B', title: 'Folder B' },
  { id: 'C', title: 'Folder C' },
];

const testData: TodoData = {
  title: 'Edited todo',
  description: '',
  isDone: true,
  folder: 'B',
};

interface TodoFieldsConfig {
  readonly loading?: boolean;
  readonly data?: TodoData;
  readonly errors?: FormErrors<TodoData>;
  readonly onChange?: () => void;
}

const getTodoFields = (config: TodoFieldsConfig = {}): JSX.Element => {
  const store = mockStore();
  store.dispatch(setFolders(testFoldersData));

  return withMockedProviders(
    <Provider store={store}>
      <TodoFields
        loading={config.loading}
        fields={config.data ?? testData}
        errors={config.errors}
        onChange={config.onChange ?? (() => null)}
      />
    </Provider>,
  );
};

describe('components/todo-detail/TodoFields', () => {
  it('should render correctly', () => {
    const { container } = render(getTodoFields());
    expect(container).toMatchSnapshot();
  });

  it('should render props', () => {
    const itemList = jest.spyOn(ItemList, 'ItemList');
    const dropdown = jest.spyOn(Dropdown, 'Dropdown');
    expect(itemList).toHaveBeenCalledTimes(0);
    expect(dropdown).toHaveBeenCalledTimes(0);

    const tree = render(
      getTodoFields({
        errors: { title: 'Title field error' },
        loading: true,
      }),
    );
    expect(tree.container).toMatchSnapshot();

    expect(itemList).toHaveBeenCalledTimes(1);
    expect(itemList.mock.calls[0][0].loading).toEqual(true);

    const inputs = tree.container.querySelectorAll('input');
    expect(inputs.length).toEqual(2);
    const [title, isDone] = Array.from(inputs);

    expect(title).toBeInTheDocument();
    expect(title?.value).toEqual('Edited todo');

    expect(isDone).toBeInTheDocument();
    expect(isDone?.checked).toEqual(true);

    expect(dropdown).toHaveBeenCalledTimes(1);
    expect(dropdown.mock.calls[0][0].value).toEqual('B');

    const description = tree.container.querySelector('textarea');
    expect(description).toBeInTheDocument();
    expect(description?.value).toEqual('');

    expect(tree.getByText('Title field error')).toBeInTheDocument();
  });

  it('should call onChange', () => {
    const onChange = jest.fn();

    const tree = render(getTodoFields({ onChange }));
    expect(onChange).toHaveBeenCalledTimes(0);

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();

    // trigger onChange event
    if (input) {
      fireEvent.change(input, { target: { value: 'New title' } });
    }
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('title', 'New title');
  });
});

import React from 'react';
import { t } from 'i18next';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { FolderList } from 'components/folder-list/FolderList';
import { FolderListItem } from 'components/folder-list/FolderListItem';
import { FolderListToolbar } from 'components/folder-list/FolderListToolbar';

import { Folder } from 'models/Folder';
import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

import { todoFoldersSlice } from 'store/folders';
import { act } from 'react-test-renderer';
import { client } from 'modules/client';

const { setFolders } = todoFoldersSlice.actions;

jest.mock('components/folder-list/FolderListItem');
jest.mock('components/folder-list/FolderListToolbar');

const getFolderList = (folders: Folder[]): JSX.Element => {
  const store = mockStore();
  store.dispatch(setFolders(folders));

  return withMockedProviders(
    <Provider store={store}>
      <FolderList />
    </Provider>,
  );
};

describe('components/folder-list/FolderList', () => {
  it('should render correctly', () => {
    const testData: Folder[] = [
      { id: 'A', title: 'Folder A' },
      { id: 'B', title: 'Folder B' },
      { id: 'C', title: 'Folder C' },
    ];
    const listItem = jest.mocked(FolderListItem);
    expect(listItem).toHaveBeenCalledTimes(0);

    const tree = render(getFolderList(testData));
    expect(tree.container).toMatchSnapshot();

    const { calls } = listItem.mock;
    expect(calls.length % 3).toEqual(0); // check item count (with re-renders)
    expect(calls[calls.length - 3][0].item.id).toEqual('A');
    expect(calls[calls.length - 2][0].item.id).toEqual('B');
    expect(calls[calls.length - 1][0].item.id).toEqual('C');
  });

  it('should render empty list', () => {
    const listItem = jest.mocked(FolderListItem);
    const toolbar = jest.mocked(FolderListToolbar);
    expect(listItem).toHaveBeenCalledTimes(0);
    expect(toolbar).toHaveBeenCalledTimes(0);

    const tree = render(getFolderList([]));
    expect(tree.container).toMatchSnapshot();

    expect(listItem).toHaveBeenCalledTimes(0);
    expect(tree.getByText(t('folderList.empty'))).toBeInTheDocument();

    expect(toolbar).toHaveBeenCalled();
    expect(toolbar.mock.calls[0][0].disabled).toEqual(true);
  });

  it('should be selectable', () => {
    const testData: Folder[] = [
      { id: 'A', title: 'Folder A' },
      { id: 'B', title: 'Folder B' },
      { id: 'C', title: 'Folder C' },
    ];
    const listItem = jest.mocked(FolderListItem);
    const toolbar = jest.mocked(FolderListToolbar);

    const tree = render(getFolderList(testData));
    expect(tree.container).toMatchSnapshot();

    const { calls } = listItem.mock;

    let items = [
      calls[calls.length - 3][0],
      calls[calls.length - 2][0],
      calls[calls.length - 1][0],
    ];
    expect(items[0].selected).toEqual(false);
    expect(items[1].selected).toEqual(false);
    expect(items[2].selected).toEqual(false);

    expect(toolbar).toHaveBeenCalled();

    if (toolbar.mock.lastCall) {
      expect(toolbar.mock.lastCall[0].selected).toEqual(false);
    }
    toolbar.mockClear();

    const testSelectItem = (
      index: 0 | 1 | 2,
      shouldSelect: boolean,
      expectation: [boolean, boolean, boolean],
      selectedAll: boolean,
    ): void => {
      act(() => items[index].onSelect(shouldSelect));

      items = [
        calls[calls.length - 3][0],
        calls[calls.length - 2][0],
        calls[calls.length - 1][0],
      ];
      expect(items[0].selected).toEqual(expectation[0]);
      expect(items[1].selected).toEqual(expectation[1]);
      expect(items[2].selected).toEqual(expectation[2]);

      expect(toolbar).toHaveBeenCalled();

      if (toolbar.mock.lastCall) {
        // select-all checkbox in toolbar active
        expect(toolbar.mock.lastCall[0].selected).toEqual(selectedAll);
      }
      toolbar.mockClear();
    };

    testSelectItem(1, true, [false, true, false], true); // select 2nd item
    testSelectItem(0, true, [true, true, false], true); // select 1st item
    testSelectItem(1, false, [true, false, false], true); // deselect 2nd item
  });

  it('should be able to un/select-all', () => {
    const testData: Folder[] = [
      { id: 'A', title: 'Folder A' },
      { id: 'B', title: 'Folder B' },
      { id: 'C', title: 'Folder C' },
    ];
    const listItem = jest.mocked(FolderListItem);
    const toolbar = jest.mocked(FolderListToolbar);

    render(getFolderList(testData));
    const { calls } = listItem.mock;

    let items = [
      calls[calls.length - 3][0],
      calls[calls.length - 2][0],
      calls[calls.length - 1][0],
    ];
    expect(items[0].selected).toEqual(false);
    expect(items[1].selected).toEqual(false);
    expect(items[2].selected).toEqual(false);

    expect(toolbar).toHaveBeenCalled();

    // trigger select all
    act(() => {
      if (toolbar.mock.lastCall) {
        toolbar.mock.lastCall[0].onSelect(true);
      }
    });

    items = [
      calls[calls.length - 3][0],
      calls[calls.length - 2][0],
      calls[calls.length - 1][0],
    ];
    expect(items[0].selected).toEqual(true);
    expect(items[1].selected).toEqual(true);
    expect(items[2].selected).toEqual(true);

    // trigger deselect all
    act(() => {
      if (toolbar.mock.lastCall) {
        toolbar.mock.lastCall[0].onSelect(false);
      }
    });

    items = [
      calls[calls.length - 3][0],
      calls[calls.length - 2][0],
      calls[calls.length - 1][0],
    ];
    expect(items[0].selected).toEqual(false);
    expect(items[1].selected).toEqual(false);
    expect(items[2].selected).toEqual(false);
  });

  it('should be sortable', () => {
    const testData: Folder[] = [
      { id: 'A', title: 'Folder A' },
      { id: 'B', title: 'Folder B' },
      { id: 'C', title: 'Folder C' },
    ];
    const listItem = jest.mocked(FolderListItem);
    const toolbar = jest.mocked(FolderListToolbar);

    render(getFolderList(testData));
    expect(toolbar).toHaveBeenCalled();

    if (toolbar.mock.lastCall) {
      expect(toolbar.mock.lastCall[0].sort).toEqual('TITLE_ASC');
    }
    const { calls } = listItem.mock;

    let items = [
      calls[calls.length - 3][0],
      calls[calls.length - 2][0],
      calls[calls.length - 1][0],
    ];
    expect(items[0].item.id).toEqual('A');
    expect(items[1].item.id).toEqual('B');
    expect(items[2].item.id).toEqual('C');

    // trigger folder sort
    act(() => {
      if (toolbar.mock.lastCall) {
        toolbar.mock.lastCall[0].onSort('TITLE_DESC');
      }
    });

    if (toolbar.mock.lastCall) {
      expect(toolbar.mock.lastCall[0].sort).toEqual('TITLE_DESC');
    }
    items = [
      calls[calls.length - 3][0],
      calls[calls.length - 2][0],
      calls[calls.length - 1][0],
    ];
    expect(items[0].item.id).toEqual('C');
    expect(items[1].item.id).toEqual('B');
    expect(items[2].item.id).toEqual('A');
  });

  it('should be able to delete selected', () => {
    const testData: Folder[] = [
      { id: 'A', title: 'Folder A' },
      { id: 'B', title: 'Folder B' },
      { id: 'C', title: 'Folder C' },
    ];
    const listItem = jest.mocked(FolderListItem);
    const toolbar = jest.mocked(FolderListToolbar);

    const mockedConfirm = jest.spyOn(window, 'confirm');
    mockedConfirm.mockImplementation(jest.fn(() => true));
    expect(mockedConfirm).toHaveBeenCalledTimes(0);

    const mockedDeleteFolders = jest.spyOn(client.folder, 'delete');
    expect(mockedDeleteFolders).toHaveBeenCalledTimes(0);

    render(getFolderList(testData));

    const { calls } = listItem.mock;

    let items = [
      calls[calls.length - 3][0],
      calls[calls.length - 2][0],
      calls[calls.length - 1][0],
    ];

    // select first two items
    act(() => {
      items[0].onSelect(true);
      items[1].onSelect(true);
    });

    items = [
      calls[calls.length - 3][0],
      calls[calls.length - 2][0],
      calls[calls.length - 1][0],
    ];
    expect(items[0].selected).toEqual(true);
    expect(items[1].selected).toEqual(true);
    expect(items[2].selected).toEqual(false);

    expect(toolbar).toHaveBeenCalled();

    // trigger toolbar onDelete
    act(() => {
      if (toolbar.mock.lastCall) {
        toolbar.mock.lastCall[0].onDelete();
      }
    });

    expect(mockedConfirm).toHaveBeenCalledTimes(1);
    expect(mockedDeleteFolders).toHaveBeenCalledTimes(1);
    expect(mockedDeleteFolders).toHaveBeenCalledWith(['A', 'B']);
  });
});

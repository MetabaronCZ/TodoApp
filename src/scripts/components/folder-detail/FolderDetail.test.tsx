import React from 'react';
import { t } from 'i18next';
import { Provider } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FolderDetail } from 'components/folder-detail/FolderDetail';
import * as FolderFields from 'components/folder-detail/FolderFields';

import { client } from 'client';
import { Folder } from 'models/Folder';

import { mockStore } from 'test/store';
import { withMockedProviders } from 'test/component';

const testData: Folder = { id: '0', title: 'Test folder' };

const getFolderDetail = (data?: Folder, error?: boolean): JSX.Element => {
  const store = mockStore();
  return withMockedProviders(
    <Provider store={store}>
      <FolderDetail data={data} fetchError={error} />
    </Provider>,
  );
};

describe('components/folder-detail/FolderDetail', () => {
  it('should render folder create variant', () => {
    const fields = vi.spyOn(FolderFields, 'FolderFields');
    expect(fields).toBeCalledTimes(0);

    const tree = render(getFolderDetail());
    expect(tree.container).toMatchSnapshot();

    expect(tree.getByText(t('page.folderCreate'))).toBeInTheDocument();
    expect(tree.getByText(t('create'))).toBeInTheDocument();

    expect(fields).toBeCalledTimes(1);
    expect(fields).lastCalledWith(
      expect.objectContaining({
        loading: false,
        errors: {},
        fields: {
          title: '',
        },
      }),
      expect.anything(),
    );
  });

  it('should render folder detail variant', () => {
    const fields = vi.spyOn(FolderFields, 'FolderFields');
    expect(fields).toBeCalledTimes(0);

    const tree = render(getFolderDetail(testData));
    expect(tree.container).toMatchSnapshot();

    expect(tree.getByText(t('page.folderDetail'))).toBeInTheDocument();
    expect(tree.getByText(t('edit'))).toBeInTheDocument();

    expect(fields).toBeCalledTimes(1);
    expect(fields).lastCalledWith(
      expect.objectContaining({
        loading: false,
        errors: {},
        fields: {
          title: 'Test folder',
        },
      }),
      expect.anything(),
    );
  });

  it('should render fetch error', () => {
    const fields = vi.spyOn(FolderFields, 'FolderFields');
    expect(fields).toBeCalledTimes(0);

    const tree = render(getFolderDetail(testData, true));
    expect(tree.container).toMatchSnapshot();

    expect(tree.getByText(t('error.detailLoading'))).toBeInTheDocument();
    expect(tree.getByText(t('page.folderDetail'))).toBeInTheDocument();
    expect(tree.queryByRole('button')).not.toBeInTheDocument();

    expect(fields).toBeCalledTimes(0);
  });

  it('should create folder', () => {
    const mockedFolderCreate = vi.spyOn(client.folder, 'create');
    const fields = vi.spyOn(FolderFields, 'FolderFields');

    const tree = render(getFolderDetail());
    expect(mockedFolderCreate).toBeCalledTimes(0);

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();

    const submitButton = tree.getByRole('button');
    expect(submitButton).toBeInTheDocument();

    // trigger form submit (validation error)
    fireEvent.click(submitButton);
    expect(mockedFolderCreate).toBeCalledTimes(0);

    if (fields.mock.lastCall) {
      expect(fields.mock.lastCall[0].errors?.title).toBeTruthy();
    }

    // type folder title
    if (input) {
      fireEvent.change(input, { target: { value: 'New folder' } });
    }

    // trigger form submit (validation OK)
    fireEvent.click(submitButton);
    expect(mockedFolderCreate).toBeCalledTimes(1);
    expect(mockedFolderCreate).toBeCalledWith({ title: 'New folder' });
  });

  it('should edit folder', () => {
    const mockedFolderEdit = vi.spyOn(client.folder, 'edit');

    const tree = render(getFolderDetail(testData));
    expect(mockedFolderEdit).toBeCalledTimes(0);

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toEqual('Test folder');

    const submitButton = tree.getByRole('button');
    expect(submitButton).toBeInTheDocument();

    // type folder title
    if (input) {
      fireEvent.change(input, { target: { value: 'Edited folder' } });
    }

    // trigger form submit
    fireEvent.click(submitButton);
    expect(mockedFolderEdit).toBeCalledTimes(1);
    expect(mockedFolderEdit).toBeCalledWith('0', { title: 'Edited folder' });
  });
});

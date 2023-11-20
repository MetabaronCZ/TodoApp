import React from 'react';
import * as Router from 'react-router';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FolderDetailPage } from 'components/pages/FolderDetailPage';
import { FolderDetail } from 'components/folder-detail/FolderDetail';

import { Folder } from 'models/Folder';
import { mockStore } from 'test/store';
import { todoFoldersSlice } from 'store/folders';
import { withMockedProviders } from 'test/component';

const { setFolders } = todoFoldersSlice.actions;

vi.mock('components/folder-detail/FolderDetail');

const testData: Folder[] = [
  { id: '0', title: 'Folder A' },
  { id: '1', title: 'Folder B' },
];

// mock FolderDetail implementaion
vi.mocked(FolderDetail).mockImplementation(({ data, fetchError }) => {
  return fetchError
    ? 'FOLDER_ERROR'
    : data
    ? `FOLDER_DETAIL:${data.id}`
    : 'FOLDER_CREATE';
});

describe('components/pages/FolderDetailPage', () => {
  it('should render error when no ID param', async () => {
    const store = mockStore();

    const tree = render(
      withMockedProviders(
        <Provider store={store}>
          <FolderDetailPage />
        </Provider>,
      ),
    );
    await tree.findByText('FOLDER_ERROR');
    expect(tree.container).toMatchSnapshot();
  });

  it('should render Folder detail with given ID', async () => {
    const testId = testData[1].id;
    vi.spyOn(Router, 'useParams').mockReturnValue({ id: testId });

    const store = mockStore();
    store.dispatch(setFolders(testData));

    const tree = render(
      withMockedProviders(
        <Provider store={store}>
          <FolderDetailPage />
        </Provider>,
      ),
    );
    await tree.findByText(`FOLDER_DETAIL:${testId}`);

    expect(tree.container).toMatchSnapshot();
  });
});

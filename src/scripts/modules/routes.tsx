import React from 'react';

import { HomePage } from 'components/pages/HomePage';
import { ErrorPage } from 'components/pages/ErrorPage';
import { NoteCreatePage } from 'components/pages/NoteCreatePage';
import { NoteDetailPage } from 'components/pages/NoteDetailPage';
import { FolderCreatePage } from 'components/pages/FolderCreatePage';
import { FolderDetailPage } from 'components/pages/FolderDetailPage';

import { paths } from './paths';

interface Route {
  readonly id: string;
  readonly path: string;
  readonly component: JSX.Element;
}

export const routes: Route[] = [
  {
    id: 'home',
    path: paths.HOME,
    component: <HomePage />,
  },
  {
    id: 'note-create',
    path: paths.NOTE_CREATE,
    component: <NoteCreatePage />,
  },
  {
    id: 'note-detail',
    path: paths.NOTE_DETAIL(':id'),
    component: <NoteDetailPage />,
  },
  {
    id: 'folder-create',
    path: paths.FOLDER_CREATE,
    component: <FolderCreatePage />,
  },
  {
    id: 'folder-detail',
    path: paths.FOLDER_DETAIL(':id'),
    component: <FolderDetailPage />,
  },
  {
    id: 'error404',
    path: paths.ERROR404,
    component: <ErrorPage />,
  },
];

import React from 'react';

import { HomePage } from 'components/pages/HomePage';
import { ErrorPage } from 'components/pages/ErrorPage';
import { TodoCreatePage } from 'components/pages/TodoCreatePage';
import { TodoDetailPage } from 'components/pages/TodoDetailPage';
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
    id: 'todo-create',
    path: paths.TODO_CREATE,
    component: <TodoCreatePage />,
  },
  {
    id: 'todo-detail',
    path: paths.TODO_DETAIL(':id'),
    component: <TodoDetailPage />,
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

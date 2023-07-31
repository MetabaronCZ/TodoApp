import React from 'react';

import { HomePage } from 'components/pages/HomePage';
import { ErrorPage } from 'components/pages/ErrorPage';
import { CreatePage } from 'components/pages/CreatePage';
import { DetailPage } from 'components/pages/DetailPage';

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
    id: 'create',
    path: paths.CREATE,
    component: <CreatePage />,
  },
  {
    id: 'detail',
    path: paths.DETAIL(':id'),
    component: <DetailPage />,
  },
  {
    id: 'error404',
    path: paths.ERROR404,
    component: <ErrorPage />,
  },
];

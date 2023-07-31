import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Page } from 'components/Page';
import { MenuContent } from 'components/MenuContent';
import { TodoList } from 'components/todo-list/TodoList';

import { folderSearchParamId } from 'modules/paths';

import { useAppDispatch } from 'store/utils';
import { fetchTodos, filterTodos } from 'store/todos/actions';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const folder = params.has(folderSearchParamId)
    ? params.get(folderSearchParamId) || ''
    : null;

  useEffect(() => {
    if (null !== folder) {
      // search by folder
      dispatch(filterTodos({ folder: folder || null }));
    } else {
      // refetch todo items
      dispatch(fetchTodos());
    }
  }, [dispatch, folder]);

  return (
    <Page title={t('homePage')}>
      <MenuContent>
        <TodoList />
      </MenuContent>
    </Page>
  );
};

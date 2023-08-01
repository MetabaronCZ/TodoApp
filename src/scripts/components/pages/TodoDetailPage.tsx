import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from 'components/Page';
import { Loader } from 'components/common/Loader';
import { MenuContent } from 'components/MenuContent';
import { TodoDetail } from 'components/todo-detail/TodoDetail';

import { Todo } from 'models/Todo';
import { useAppDispatch } from 'store/utils';
import { fetchTodoDetail } from 'store/todos/actions';

type SearchParams = {
  readonly id?: string;
};

export const TodoDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<SearchParams>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Todo | null>(null);

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }
    dispatch(fetchTodoDetail(id))
      .then(({ payload }) => {
        if (payload && !(payload instanceof Error)) {
          setData(payload);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [dispatch, id]);

  return (
    <Page title={t('page.todoDetail')}>
      <MenuContent>
        {loading ? <Loader /> : <TodoDetail data={data} fetchError={error} />}
      </MenuContent>
    </Page>
  );
};

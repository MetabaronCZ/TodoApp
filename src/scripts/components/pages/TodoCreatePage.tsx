import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MenuContent } from 'components/MenuContent';
import { TodoDetail } from 'components/todo-detail/TodoDetail';

export const TodoCreatePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.todoCreate')}>
      <MenuContent>
        <TodoDetail />
      </MenuContent>
    </Page>
  );
};

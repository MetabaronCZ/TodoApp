import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MenuContent } from 'components/MenuContent';
import { TodoList } from 'components/todo-list/TodoList';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('homepage')}>
      <MenuContent>
        <TodoList />
      </MenuContent>
    </Page>
  );
};

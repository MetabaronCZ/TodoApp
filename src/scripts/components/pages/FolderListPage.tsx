import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MenuContent } from 'components/MenuContent';
import { FolderList } from 'components/folder-list/FolderList';

export const FolderListPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.folderList')}>
      <MenuContent>
        <FolderList />
      </MenuContent>
    </Page>
  );
};

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MenuContent } from 'components/MenuContent';
import { FolderDetail } from 'components/folder-detail/FolderDetail';

export const FolderCreatePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.folderCreate')}>
      <MenuContent>
        <FolderDetail />
      </MenuContent>
    </Page>
  );
};

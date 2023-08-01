import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MenuContent } from 'components/MenuContent';
import { FolderDetail } from 'components/folder-detail/FolderDetail';

import { useAppSelector } from 'store/utils';

type SearchParams = {
  readonly id?: string;
};

export const FolderDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<SearchParams>();
  const folders = useAppSelector((state) => state.folder.items);

  const folder = folders.find((item) => id === item.id);

  return (
    <Page title={t('page.folderDetail')}>
      <MenuContent>
        <FolderDetail data={folder} fetchError={!folder} />
      </MenuContent>
    </Page>
  );
};

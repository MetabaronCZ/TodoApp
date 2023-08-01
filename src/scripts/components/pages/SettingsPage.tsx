import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MenuContent } from 'components/MenuContent';

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.settings')}>
      <MenuContent>
        <div>-settings-</div>
      </MenuContent>
    </Page>
  );
};

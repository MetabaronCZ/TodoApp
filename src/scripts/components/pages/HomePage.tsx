import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { Paragraph } from 'components/common/Paragraph';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const title = t('homepage');
  return (
    <Page title={title}>
      <Paragraph>{title}</Paragraph>
    </Page>
  );
};

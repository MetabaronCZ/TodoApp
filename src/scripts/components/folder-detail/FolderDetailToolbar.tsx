import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { Toolbar } from 'components/common/Toolbar';

import { paths } from 'modules/paths';

interface Props {
  readonly disabled?: boolean;
}

export const FolderDetailToolbar: React.FC<Props> = ({ disabled = false }) => {
  const { t } = useTranslation();
  return (
    <Toolbar
      items={[
        <Button
          ico="arrowLeft"
          text={t('back')}
          href={paths.FOLDER_LIST}
          disabled={disabled}
          key="back"
        />,
      ]}
    />
  );
};

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { Toolbar } from 'components/common/Toolbar';

import { paths } from 'modules/paths';

interface Props {
  readonly disabled?: boolean;
}

export const TodoDetailToolbar: React.FC<Props> = ({ disabled = false }) => {
  const { t } = useTranslation();
  return (
    <Toolbar
      items={[
        <Button
          ico="❮"
          text={t('back')}
          href={paths.HOME}
          disabled={disabled}
          key="back"
        />,
      ]}
    />
  );
};

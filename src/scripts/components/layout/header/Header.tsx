import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { Logo } from 'components/layout/header/Logo';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';

const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${toVU(1)} 0;
`;

const Filler = styled.div`
  flex: 1;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1)};
`;

export const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Logo />
      <Filler />

      <Actions>
        <Button
          ico="star"
          title={t('page.folderList')}
          href={paths.FOLDER_LIST}
        />
        <Button ico="edit" title={t('page.settings')} href={paths.SETTINGS} />
      </Actions>
    </Container>
  );
};

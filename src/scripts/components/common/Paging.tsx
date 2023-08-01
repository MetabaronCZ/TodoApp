import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { Text } from 'components/common/Typography';

import { toVU } from 'modules/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${toVU(1)};
  border-top: ${({ theme }) => theme.border.light};
`;

const Page = styled.div`
  ${Text.Base};
`;

interface Props {
  readonly page: number;
  readonly count: number;
  readonly perPage: number;
  readonly onChange: (page: number) => void;
}

export const Paging: React.FC<Props> = ({ page, count, perPage, onChange }) => {
  const { t } = useTranslation();
  const lastPage = Math.ceil(count / perPage) - 1;
  return (
    <Container>
      <Button
        ico="arrowLeft"
        title={t('prev')}
        onClick={() => onChange(page - 1)}
        disabled={0 === page}
      />

      <Page>{page + 1}</Page>

      <Button
        ico="arrowRight"
        title={t('next')}
        onClick={() => onChange(page + 1)}
        disabled={lastPage === page}
      />
    </Container>
  );
};

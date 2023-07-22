import React from 'react';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';

import { Link } from 'components/common/Link';

const yearStart = 2023;
const autohrUrl = 'https://github.com/MetabaronCZ';

const Container = styled.div`
  /* */
`;

export const Copyright: React.FC = () => {
  const { t } = useTranslation();
  const yearNow = new Date().getFullYear();
  const year = yearNow > yearStart ? `${yearStart} - ${yearNow}` : yearStart;
  return (
    <Container>
      <Trans
        t={t}
        i18nKey="copyright"
        values={{ year, author: autohrUrl }}
        components={{ authorLink: <Link target="_blank" href={autohrUrl} /> }}
      />
    </Container>
  );
};

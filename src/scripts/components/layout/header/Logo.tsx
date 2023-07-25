import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Text } from 'components/common/Typography';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';

const Container = styled.a`
  ${Text.Base};
  display: block;
  padding: 0 ${toVU(1)};
  font-size: ${toVU(2)};
  line-height: ${toVU(4)};
  font-weight: bold;
  letter-spacing: 2px;
  text-decoration: none;

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
  }
`;

export const Logo: React.FC = () => {
  const { t } = useTranslation();
  return <Container href={paths.HOME}>☑ {t('appName')}</Container>;
};

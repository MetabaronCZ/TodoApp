import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/common/Typography';
import { Copyright } from 'components/layout/footer/Copyright';

import { toVU } from 'modules/theme';

const Container = styled.footer`
  ${Text.Base};
  padding: ${toVU(2)} 0;
  text-align: center;
`;

export const Footer: React.FC = () => (
  <Container>
    <Copyright />
  </Container>
);

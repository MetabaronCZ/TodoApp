import React from 'react';
import styled from 'styled-components';

import { Logo } from 'components/layout/header/Logo';
import { toVU } from 'modules/theme';

const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${toVU(1)} 0;
`;

export const Header: React.FC = () => (
  <Container>
    <Logo />
  </Container>
);

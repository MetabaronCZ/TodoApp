import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Header } from './Header';
import { Footer } from './Footer';
import { Content } from './Content';

import { toVU } from 'modules/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${toVU(2)};
  width: 100%;
  min-width: ${({ theme }) => theme.dimension.pageMinWidth};
  min-height: 100vh;
  padding: ${toVU(2)};
  background: ${({ theme }) => theme.color.background};
`;

export const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <Container>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </Container>
);

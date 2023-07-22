import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Content } from './Content';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';

import { toVU } from 'modules/theme';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 0 ${toVU(2)};
  background: ${({ theme }) => theme.color.background};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${({ theme }) => theme.dimension.pageMinWidth};
  max-width: ${({ theme }) => theme.dimension.pageMaxWidth};
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
`;

export const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <Container>
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  </Container>
);

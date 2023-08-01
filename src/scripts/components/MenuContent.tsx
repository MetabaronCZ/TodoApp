import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Grid } from 'components/common/Grid';
import { MenuMain } from 'components/MenuMain';

import { toVU } from 'modules/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${toVU(2)};
`;

const MenuColumn = styled.nav`
  width: ${({ theme }) => theme.dimension.menuColumnWidth};
`;

const ContentColumn = styled(Grid)`
  flex: 1;
  min-width: 0;
`;

export const MenuContent: React.FC<PropsWithChildren> = ({ children }) => (
  <Container>
    <MenuColumn>
      <MenuMain />
    </MenuColumn>

    <ContentColumn>{children}</ContentColumn>
  </Container>
);

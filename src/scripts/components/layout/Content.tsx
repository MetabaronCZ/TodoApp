import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';

const Container = styled.main`
  flex: 1;
  padding: ${toVU(1)} 0;
`;

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

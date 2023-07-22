import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.main`
  flex: 1;
`;

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

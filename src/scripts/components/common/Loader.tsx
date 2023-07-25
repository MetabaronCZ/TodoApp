import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Text } from 'components/common/Typography';
import { toVU } from 'modules/theme';

const rotateAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${toVU(2)} 0;
`;

const Visual = styled.div`
  ${Text.Base};
  width: ${toVU(3)};
  height: ${toVU(3)};
  font-size: ${toVU(3)};
  line-height: 1;
  user-select: none;
  text-align: center;
  animation: ${rotateAnimation} 1000ms linear infinite;
`;

export const Loader: React.FC = () => (
  <Container>
    <Visual>↻</Visual>
  </Container>
);

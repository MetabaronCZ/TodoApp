import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';

interface StyledProps {
  readonly $gap: number;
}

export const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => toVU($gap)};
`;

interface Props extends PropsWithChildren {
  readonly size?: number;
}

export const Grid: React.FC<Props> = ({ size = 2, children }) => {
  size = Math.max(0, size);
  return <Container $gap={size}>{children}</Container>;
};

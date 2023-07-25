import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';

interface StyledProps {
  readonly $gap: number;
}

const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => toVU($gap)};
`;

interface Props extends PropsWithChildren {
  readonly className?: string;
  readonly size?: number;
}

export const Grid: React.FC<Props> = ({ className, size = 2, children }) => {
  size = Math.max(0, size);
  return (
    <Container className={className} $gap={size}>
      {children}
    </Container>
  );
};

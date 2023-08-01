import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Text } from 'components/common/Typography';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';

const Container = styled.div`
  ${Text.Large};
  font-weight: normal;
  margin: 0;
`;

interface Props extends PropsWithChildren {
  readonly className?: string;
  readonly tag?: HeadingTag;
}

export const Heading: React.FC<Props> = ({
  className,
  tag = 'h1',
  children,
}) => (
  <Container className={className} as={tag}>
    {children}
  </Container>
);

import React, { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled(RouterLink)`
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  text-decoration: none;
  color: ${({ theme }) => theme.color.action};

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.action};
  }
`;

interface Props extends PropsWithChildren {
  readonly href: string;
  readonly target?: HTMLAttributeAnchorTarget;
}

export const Link: React.FC<Props> = ({ href, target, children }) => (
  <Container target={target} to={href}>
    {children}
  </Container>
);

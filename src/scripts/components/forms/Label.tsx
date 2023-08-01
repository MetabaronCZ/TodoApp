import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/common/Typography';

interface StyledProps {
  readonly $disabled: boolean;
}

export const Container = styled.label<StyledProps>`
  ${Text.Base};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.disabled : theme.color.base};
  user-select: none;
`;

interface Props {
  readonly className?: string;
  readonly text: string;
  readonly htmlFor?: string; // form field ID
  readonly disabled?: boolean;
}

export const Label: React.FC<Props> = ({
  htmlFor,
  className,
  text,
  disabled = false,
}) => (
  <Container className={className} htmlFor={htmlFor} $disabled={disabled}>
    {text}
  </Container>
);

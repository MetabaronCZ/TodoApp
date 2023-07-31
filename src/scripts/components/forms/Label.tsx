import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/common/Typography';

interface StyledProps {
  readonly $invalid: boolean;
  readonly $disabled: boolean;
}

export const Container = styled.label<StyledProps>`
  ${Text.Base};
  color: ${({ theme, $invalid, $disabled }) =>
    $disabled
      ? theme.color.disabled
      : $invalid
      ? theme.color.error
      : theme.color.base};
  user-select: none;
`;

interface Props {
  readonly className?: string;
  readonly text: string;
  readonly htmlFor?: string; // form field ID
  readonly invalid?: boolean;
  readonly disabled?: boolean;
}

export const Label: React.FC<Props> = ({
  htmlFor,
  className,
  text,
  invalid = false,
  disabled = false,
}) => (
  <Container
    className={className}
    htmlFor={htmlFor}
    $invalid={invalid}
    $disabled={disabled}
  >
    {text}
  </Container>
);

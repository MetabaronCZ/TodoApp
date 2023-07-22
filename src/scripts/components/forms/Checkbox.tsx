import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/Typography';

import { toVU } from 'modules/theme';
import { OnChange, check } from 'modules/event';

const checkboxSize = toVU(2);

interface StyledProps {
  readonly $invalid: boolean;
  readonly $disabled: boolean;
}

const Container = styled.label<StyledProps>`
  ${Text.Base};
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${checkboxSize};
  height: ${checkboxSize};
  border: ${({ theme, $invalid, $disabled }) =>
    $disabled
      ? theme.border.formsDisabled
      : $invalid
      ? theme.border.formsInvalid
      : theme.border.forms};
  color: ${({ theme, $invalid, $disabled }) =>
    $disabled
      ? theme.color.disabled
      : $invalid
      ? theme.color.error
      : theme.color.base};
  user-select: none;
  cursor: pointer;

  &:focus-within {
    outline: ${({ theme, $invalid, $disabled }) =>
      !$disabled && ($invalid ? theme.outline.invalid : theme.outline.default)};
  }
`;

const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
  outline: none;
`;

interface Props {
  readonly id?: string;
  readonly checked?: boolean;
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  readonly onChange?: OnChange<boolean>;
}

export const Checkbox: React.FC<Props> = ({
  id,
  checked = false,
  invalid = false,
  disabled = false,
  onChange,
}) => (
  <Container htmlFor={id} $invalid={invalid} $disabled={disabled}>
    {checked ? '✔' : ''}
    <StyledInput
      id={id}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={check(onChange)}
    />
  </Container>
);

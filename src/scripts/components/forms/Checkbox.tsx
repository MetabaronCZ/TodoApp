import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/Typography';

import { toVU } from 'modules/theme';
import { OnChange, check } from 'modules/event';

const checkboxSize = toVU(2);
let idCounter = 0; // checkbox identificator counter

interface StyledProps {
  readonly $invalid: boolean;
  readonly $disabled: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1)};
`;

const Label = styled.label<StyledProps>`
  ${Text.Base};
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1)};
  color: ${({ theme, $invalid, $disabled }) =>
    $disabled
      ? theme.color.disabled
      : $invalid
      ? theme.color.error
      : theme.color.base};
`;

const CheckMark = styled.label<StyledProps>`
  ${Text.Base};
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  line-height: 1;
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
  background: ${({ theme }) => theme.color.background};
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
  readonly label?: string;
  readonly checked?: boolean;
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  readonly onChange?: OnChange<boolean>;
}

export const Checkbox: React.FC<Props> = ({
  id,
  label,
  checked = false,
  invalid = false,
  disabled = false,
  onChange,
}) => {
  id = id ?? `checkbox-${idCounter++}`;
  return (
    <Container>
      <CheckMark htmlFor={id} $invalid={invalid} $disabled={disabled}>
        {checked ? '✔' : ''}
        <StyledInput
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={check(onChange)}
        />
      </CheckMark>

      {!!label && (
        <Label htmlFor={id} $invalid={invalid} $disabled={disabled}>
          {label}
        </Label>
      )}
    </Container>
  );
};

import React from 'react';
import styled from 'styled-components';

import { Label } from 'components/forms/Label';
import { Text } from 'components/common/Typography';

import { toVU } from 'modules/theme';
import { OnChange, check } from 'modules/event';

const checkboxSize = toVU(2);
let idCounter = 0; // checkbox identificator counter

interface StyledProps {
  readonly $disabled: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1)};
  height: ${toVU(3)};
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
  border: ${({ theme, $disabled }) =>
    $disabled ? theme.border.formsDisabled : theme.border.forms};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.disabled : theme.color.base};
  background: ${({ theme }) => theme.color.field};
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $disabled }) =>
      $disabled ? '' : theme.color.hoverLight};
  }

  &:focus-within {
    outline: ${({ theme, $disabled }) =>
      $disabled ? '' : theme.outline.default};
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
  readonly disabled?: boolean;
  readonly onChange?: OnChange<boolean>;
}

export const Checkbox: React.FC<Props> = ({
  id,
  label,
  checked = false,
  disabled = false,
  onChange,
}) => {
  id = id ?? `checkbox-${idCounter++}`;
  return (
    <Container>
      <CheckMark htmlFor={id} $disabled={disabled}>
        {checked ? '✔' : ''}
        <StyledInput
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={check(onChange)}
        />
      </CheckMark>

      {!!label && <Label htmlFor={id} text={label} disabled={disabled} />}
    </Container>
  );
};

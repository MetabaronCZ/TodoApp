import React from 'react';
import styled from 'styled-components';

import { Label } from 'components/forms/Label';
import { Checkbox } from 'components/forms/Checkbox';
import { TextField } from 'components/forms/TextField';
import { Dropdown, DropdownItem } from 'components/forms/Dropdown';

import { toVU } from 'modules/theme';
import { OnChange } from 'modules/event';

let idCounter = 0; // Todo field identificator counter

interface BooleanField {
  readonly type: 'checkbox';
  readonly value: boolean;
  readonly onChange: OnChange<boolean>;
}

interface TextField {
  readonly type: 'text';
  readonly value: string;
  readonly textarea?: boolean;
  readonly maxLength?: number;
  readonly onChange: OnChange<string>;
}

interface DropdownField<T> {
  readonly type: 'dropdown';
  readonly value: T;
  readonly options: DropdownItem<T>[];
  readonly onChange: OnChange<T>;
}
type TodoFieldValue<T> = BooleanField | TextField | DropdownField<T>;

interface StyledProps {
  readonly $vertical: boolean;
}

const Container = styled.div<StyledProps>`
  display: flex;
  display: ${({ $vertical }) => ($vertical ? 'block' : 'flex')};
  flex-direction: row;
  align-items: flex-start;
  gap: ${toVU(1)};
`;

const LabelColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${toVU(10)};
  min-height: ${toVU(3)};
`;

const FieldColumn = styled.div`
  flex: 1;
`;

interface Props<T> {
  readonly label: string;
  readonly error?: string | null;
  readonly field: TodoFieldValue<T>;
  readonly vertical?: boolean;
}

export const TodoField = <T,>({
  label,
  field,
  error = null,
  vertical = false,
}: Props<T>): React.ReactNode => {
  const id = `todo-field-${idCounter++}`;
  return (
    <Container $vertical={vertical}>
      <LabelColumn>
        <Label text={`${label}:`} htmlFor={id} />
      </LabelColumn>

      <FieldColumn>
        {'checkbox' === field.type ? (
          <Checkbox id={id} checked={field.value} onChange={field.onChange} />
        ) : 'text' === field.type ? (
          <TextField
            id={id}
            value={field.value}
            error={error}
            maxLength={field.maxLength}
            textarea={field.textarea}
            onChange={field.onChange}
          />
        ) : (
          <Dropdown
            id={id}
            value={field.value}
            items={field.options}
            onSelect={field.onChange}
          />
        )}
      </FieldColumn>
    </Container>
  );
};

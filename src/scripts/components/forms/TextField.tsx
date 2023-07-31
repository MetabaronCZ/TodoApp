import React from 'react';
import styled, { css } from 'styled-components';

import { Text } from 'components/common/Typography';

import { toVU } from 'modules/theme';
import { OnChange, change } from 'modules/event';

interface StyledProps {
  readonly $invalid: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SharedStyles = css<StyledProps>`
  ${Text.Base};
  display: block;
  width: 100%;
  padding: ${toVU(0.5)} ${toVU(1)};
  background: ${({ theme }) => theme.color.field};
  color: ${({ theme, $invalid }) => ($invalid ? theme.color.error : '')};
  border: none;
  outline: none;

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
    outline-offset: -1px;
  }

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
  }
`;

const StyledInput = styled.input`
  ${SharedStyles};
`;

const StyledTextarea = styled.textarea`
  ${SharedStyles};
  min-height: ${toVU(11)};
  resize: vertical;
`;

const Error = styled.div`
  ${Text.Base};
  display: block;
  color: ${({ theme }) => theme.color.error};
`;

interface Props {
  readonly id?: string;
  readonly className?: string;
  readonly value?: string;
  readonly error?: string | null;
  readonly textarea?: boolean;
  readonly disabled?: boolean;
  readonly maxLength?: number;
  readonly onChange: OnChange<string>;
}

export const TextField: React.FC<Props> = ({
  id,
  className,
  value = '',
  error = null,
  disabled = false,
  textarea = false,
  maxLength,
  onChange,
}) => {
  const sharedProps = {
    id,
    className,
    value,
    maxLength,
    disabled,
    $invalid: !!error,
    onChange: change(onChange),
  };
  return (
    <Container>
      {textarea ? (
        <StyledTextarea {...sharedProps} />
      ) : (
        <StyledInput type="text" {...sharedProps} />
      )}
      {!!error && <Error>{error}</Error>}
    </Container>
  );
};

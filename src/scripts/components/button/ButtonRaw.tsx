import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { OnClick, click } from 'modules/event';

const StyledButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
`;

interface Props extends PropsWithChildren {
  readonly id?: string;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly onClick?: OnClick;
}

export const ButtonRaw: React.FC<Props> = ({
  id,
  className,
  disabled = false,
  children,
  onClick,
}) => (
  <StyledButton
    id={id}
    className={className}
    type="button"
    disabled={disabled}
    onClick={click(onClick)}
  >
    {children}
  </StyledButton>
);

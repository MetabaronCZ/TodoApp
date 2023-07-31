import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Text } from 'components/common/Typography';
import { ButtonRaw } from 'components/button/ButtonRaw';

import { toVU } from 'modules/theme';
import { OnClick } from 'modules/event';

const SharedStyles = css`
  ${Text.Base};
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(0.5)};
  width: auto;
  padding: ${toVU(0.5)} ${toVU(1)};
  background: ${({ theme }) => theme.color.background};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
    outline-offset: -1px;
  }

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
  }
`;

const StyledButton = styled(ButtonRaw)`
  ${SharedStyles};
`;

const StyledLink = styled(Link)`
  ${SharedStyles};
  text-decoration: none;
`;

const ButtonIco = styled.span`
  /* */
`;

const ButtonText = styled.span`
  flex: 1;
`;

interface Props {
  readonly id?: string;
  readonly className?: string;
  readonly text: string;
  readonly ico?: string;
  readonly icoBefore?: string;
  readonly icoAfter?: string;
  readonly disabled?: boolean;
  readonly href?: string;
  readonly onClick?: OnClick;
}

export const Button: React.FC<Props> = ({
  id,
  className,
  text,
  ico,
  icoBefore,
  icoAfter,
  disabled = false,
  href,
  onClick,
}) => {
  ico = ico ?? icoBefore;

  const content = (
    <>
      {!!ico && <ButtonIco>{ico}</ButtonIco>}
      <ButtonText>{text}</ButtonText>
      {!!icoAfter && <ButtonIco>{icoAfter}</ButtonIco>}
    </>
  );
  const sharedProps = { id, className };

  return href && !disabled ? (
    <StyledLink {...sharedProps} to={href}>
      {content}
    </StyledLink>
  ) : (
    <StyledButton {...sharedProps} disabled={disabled} onClick={onClick}>
      {content}
    </StyledButton>
  );
};

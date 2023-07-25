import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Text } from 'components/common/Typography';
import { ButtonRaw } from 'components/button/ButtonRaw';

import { toVU } from 'modules/theme';
import { OnClick } from 'modules/event';

interface StyledProps {
  readonly $disabled: boolean;
}

const SharedStyles = css<StyledProps>`
  ${Text.Base};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(0.5)};
  padding: ${toVU(0.5)} ${toVU(1)};

  &:hover {
    background-color: ${({ theme, $disabled }) =>
      $disabled ? '' : theme.color.hover};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
  }
`;

const StyledButton = styled(ButtonRaw)`
  ${SharedStyles};

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
  }
`;

const StyledLink = styled(Link)`
  ${SharedStyles};
  text-decoration: none;

  &[href=''] {
    color: ${({ theme }) => theme.color.disabled};
  }
`;

const ButtonIco = styled.span`
  /* */
`;

const ButtonText = styled.span`
  flex: 1;
`;

interface Props {
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
  const sharedProps = {
    className,
    $disabled: disabled,
  };
  return href ? (
    <StyledLink {...sharedProps} to={!disabled ? href : ''}>
      {content}
    </StyledLink>
  ) : (
    <StyledButton {...sharedProps} disabled={disabled} onClick={onClick}>
      {content}
    </StyledButton>
  );
};

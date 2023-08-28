import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Ico, IcoId } from 'components/common/Ico';
import { Text } from 'components/common/Typography';
import { ButtonRaw } from 'components/button/ButtonRaw';

import { toVU } from 'modules/theme';
import { OnClick, click } from 'modules/event';

interface StyledProps {
  readonly $withIcoBefore: boolean;
  readonly $withIcoAfter: boolean;
}

const SharedStyles = css<StyledProps>`
  ${Text.Base};
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  padding: ${toVU(0.5)} ${toVU(1)};
  padding-left: ${({ $withIcoBefore }) => ($withIcoBefore ? toVU(0.5) : '')};
  padding-right: ${({ $withIcoAfter }) => ($withIcoAfter ? toVU(0.5) : '')};
  background: ${({ theme }) => theme.color.background};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.hoverDark};
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

const ButtonText = styled.span`
  flex: 1;
`;

interface Props {
  readonly id?: string;
  readonly className?: string;
  readonly title?: string;
  readonly text?: string;
  readonly ico?: IcoId;
  readonly icoBefore?: IcoId;
  readonly icoAfter?: IcoId;
  readonly disabled?: boolean;
  readonly href?: string;
  readonly onClick?: OnClick;
}

export const Button: React.FC<Props> = ({
  id,
  className,
  title,
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
      {!!ico && <Ico ico={ico} color={disabled ? 'disabled' : null} />}
      {!!text && <ButtonText>{text}</ButtonText>}
      {!!icoAfter && (
        <Ico ico={icoAfter} color={disabled ? 'disabled' : null} />
      )}
    </>
  );
  const sharedProps = {
    id,
    className,
    title,
    $withIcoBefore: !text || !!ico,
    $withIcoAfter: !text || !!icoAfter,
  };

  return href && !disabled ? (
    <StyledLink {...sharedProps} to={href} onClick={click(onClick)}>
      {content}
    </StyledLink>
  ) : (
    <StyledButton {...sharedProps} disabled={disabled} onClick={onClick}>
      {content}
    </StyledButton>
  );
};

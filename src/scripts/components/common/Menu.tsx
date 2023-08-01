import React from 'react';
import styled from 'styled-components';

import { IcoId } from 'components/common/Ico';
import { Button } from 'components/button/Button';
import { ItemList } from 'components/common/ItemList';

import { OnClick } from 'modules/event';

interface StyledProps {
  readonly $active: boolean;
}

const StyledButton = styled(Button)<StyledProps>`
  width: 100%;
  background: ${({ theme, $active }) => ($active ? theme.color.active : '')};
  text-align: left;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.color.active : ''};
  }
`;

export interface MenuItem {
  readonly id: string;
  readonly ico?: IcoId;
  readonly title: string;
  readonly active?: boolean;
  readonly href?: string;
  readonly onClick?: OnClick;
}

interface Props {
  readonly items: MenuItem[];
}

export const Menu: React.FC<Props> = ({ items }) => {
  if (0 === items.length) {
    return null;
  }
  return (
    <ItemList>
      {items.map((item) => (
        <StyledButton
          ico={item.ico}
          text={item.title}
          $active={!!item.active}
          href={item.href}
          onClick={item.onClick}
          key={item.id}
        />
      ))}
    </ItemList>
  );
};

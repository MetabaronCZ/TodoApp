import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/common/Typography';
import { ButtonRaw } from 'components/button/ButtonRaw';
import { TextOverflow } from 'components/common/TextOverflow';

import { toVU } from 'modules/theme';
import { OnClick } from 'modules/event';

interface StyledProps {
  readonly $active: boolean;
}

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  list-style-type: none;
`;

const MenuButton = styled(ButtonRaw)<StyledProps>`
  ${Text.Base};
  ${TextOverflow};
  padding: ${toVU(0.5)};
  border-bottom: ${({ theme }) => theme.border.light};
  background: ${({ theme, $active }) => ($active ? theme.color.active : '')};
  text-align: left;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? '' : theme.color.hover};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
  }
`;

export interface MenuItem {
  readonly id: string;
  readonly title: string;
  readonly active?: boolean;
  readonly onClick: OnClick;
}

interface Props {
  readonly items: MenuItem[];
}

export const Menu: React.FC<Props> = ({ items }) => {
  if (0 === items.length) {
    return null;
  }
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <MenuButton $active={!!item.active} onClick={item.onClick}>
            ★ {item.title}
          </MenuButton>
        </ListItem>
      ))}
    </List>
  );
};

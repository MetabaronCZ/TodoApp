import React from 'react';
import styled from 'styled-components';

import { Button } from 'components/button/Button';

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
  border-bottom: ${({ theme }) => theme.border.light};
`;

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
        <ListItem key={item.id + 33}>
          <StyledButton
            ico="★"
            text={item.title}
            $active={!!item.active}
            onClick={item.onClick}
          />
        </ListItem>
      ))}
    </List>
  );
};

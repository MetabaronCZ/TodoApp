import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { UpdatedContent } from 'components/common/UpdatedContent';

interface StyledProps {
  readonly $loading?: boolean;
}

const List = styled.ul<StyledProps>`
  ${UpdatedContent};
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  border-bottom: ${({ theme }) => theme.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

interface Props extends PropsWithChildren {
  readonly loading?: boolean;
}

export const ItemList: React.FC<Props> = ({ loading = false, children }) => {
  const items = React.Children.toArray(children);

  if (0 === items.length) {
    return;
  }
  return (
    <List $loading={loading}>
      {items.map((item, i) => (
        <ListItem key={i}>{item}</ListItem>
      ))}
    </List>
  );
};

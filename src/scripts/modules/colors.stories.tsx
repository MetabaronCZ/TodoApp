import React from 'react';
import styled from 'styled-components';
import type { StoryObj } from '@storybook/react';

import { Text } from 'components/Typography';

import { toVU } from 'modules/theme';
import { colors } from 'modules/colors';

interface StyledProps {
  readonly $color: string;
}

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${toVU(1)};
  max-width: 640px;
  margin: 0 auto;
`;

const ListItem = styled.li<StyledProps>`
  ${Text.Base};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(0.5)};
  height: ${toVU(2)};
  padding-right: ${toVU(0.5)};
  border: 1px solid ${({ $color }) => $color};
  white-space: nowrap;

  &::before {
    content: ' ';
    display: block;
    width: calc(${toVU(2)} - 1px);
    height: 100%;
    background: ${({ $color }) => $color};
  }
`;

export default {
  title: 'Colors',
};

export const ColorsStory: StoryObj = {
  name: 'Colors',
  render: () => (
    <List>
      {Object.entries(colors).map(([name, color]) => (
        <ListItem $color={color} key={name}>
          {name}
        </ListItem>
      ))}
    </List>
  ),
};

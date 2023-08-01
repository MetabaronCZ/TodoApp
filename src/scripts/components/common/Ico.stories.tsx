import React from 'react';
import styled from 'styled-components';
import type { Meta, StoryObj } from '@storybook/react';

import { Ico, IcoId } from 'components/common/Ico';

import { icos } from 'modules/icos';
import { toVU } from 'modules/theme';

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: ${toVU(40)};
  margin: 0 auto;
`;

const ListItem = styled.li`
  padding: ${toVU(1)};
`;

const meta: Meta<typeof Ico> = {
  title: 'Icos',
  component: Ico,
};

export default meta;

type Story = StoryObj<typeof Ico>;

export const IcoStory: Story = {
  name: 'Icos',
  render: () => (
    <List>
      {Object.keys(icos).map((id) => (
        <ListItem title={id} key={id}>
          <Ico ico={id as IcoId} />
        </ListItem>
      ))}
    </List>
  ),
};

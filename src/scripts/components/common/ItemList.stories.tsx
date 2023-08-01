import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { ItemList } from 'components/common/ItemList';
import { Paragraph } from 'components/common/Paragraph';

const meta: Meta<typeof ItemList> = {
  title: 'Common',
  component: ItemList,
};

export default meta;

type Story = StoryObj<typeof ItemList>;

export const ItemListStory: Story = {
  name: 'ItemList',
  render: () => (
    <Grid size={1}>
      <div>
        <ItemList>
          <Paragraph>Default ItemList</Paragraph>
          <Paragraph>Item 1</Paragraph>
          <Paragraph>Item 2</Paragraph>
          <Paragraph>Item 3</Paragraph>
        </ItemList>
      </div>

      <div>
        <ItemList loading>
          <Paragraph>ItemList loading</Paragraph>
          <Paragraph>Item 1</Paragraph>
          <Paragraph>Item 2</Paragraph>
          <Paragraph>Item 3</Paragraph>
        </ItemList>
      </div>
    </Grid>
  ),
};

import React from 'react';
import styled from 'styled-components';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Paragraph } from 'components/common/Paragraph';
import { Dropdown, DropdownItem } from 'components/forms/Dropdown';

const testItems: DropdownItem<number>[] = [
  { id: '1', title: 'Item 1', value: 1 },
  { id: '2', title: 'Item 2', value: 2 },
  { id: '3', title: 'Item 3', value: 3 },
  { id: '4', title: 'Item 4', value: 4 },
  { id: '5', title: 'Item 5', value: 5 },
];

const Container = styled(Grid)`
  padding-left: 100px;
`;

const meta: Meta<typeof Dropdown> = {
  title: 'Forms',
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const DropdownStory: Story = {
  name: 'Dropdown',
  render: () => (
    <Container>
      <Grid size={1}>
        <Paragraph>Default dropdown:</Paragraph>
        <div>
          <Dropdown
            value={testItems[0].value}
            items={testItems}
            onSelect={action('Item selected!')}
          />
        </div>
      </Grid>

      <Grid size={1}>
        <Paragraph>Right aligned dropdown:</Paragraph>
        <div>
          <Dropdown
            value={testItems[0].value}
            items={testItems}
            align="right"
            onSelect={action('Item selected!')}
          />
        </div>
      </Grid>

      <Grid size={1}>
        <Paragraph>Disabled dropdown:</Paragraph>
        <div>
          <Dropdown
            value={testItems[0].value}
            items={testItems}
            disabled
            onSelect={action('Item selected!')}
          />
        </div>
      </Grid>
    </Container>
  ),
};

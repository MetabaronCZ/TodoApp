import React from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Paging } from 'components/common/Paging';
import { Paragraph } from 'components/common/Paragraph';

const meta: Meta<typeof Paging> = {
  title: 'Common',
  component: Paging,
};

export default meta;

type Story = StoryObj<typeof Paging>;

export const PagingStory: Story = {
  name: 'Paging',
  render: () => (
    <Grid size={1}>
      <Grid size={1}>
        <Paragraph>Default paging</Paragraph>
        <Paging
          page={5}
          count={123}
          perPage={25}
          onChange={action('Page changed!')}
        />
      </Grid>

      <Grid size={1}>
        <Paragraph>On first page</Paragraph>
        <Paging
          page={0}
          count={50}
          perPage={25}
          onChange={action('Page changed!')}
        />
      </Grid>

      <Grid size={1}>
        <Paragraph>On last page</Paragraph>
        <Paging
          page={1}
          count={50}
          perPage={25}
          onChange={action('Page changed!')}
        />
      </Grid>

      <Grid size={1}>
        <Paragraph>Only one page</Paragraph>
        <Paging
          page={0}
          count={10}
          perPage={25}
          onChange={action('Page changed!')}
        />
      </Grid>
    </Grid>
  ),
};

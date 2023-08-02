import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Heading } from 'components/common/Heading';

const meta: Meta<typeof Heading> = {
  title: 'Common',
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const HeadingStory: Story = {
  name: 'Heading',
  render: () => (
    <Grid>
      <Heading>Default heading</Heading>
      <Heading tag="h2">Heading with H2 tag</Heading>
    </Grid>
  ),
};

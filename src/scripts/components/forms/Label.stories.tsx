import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Label } from 'components/forms/Label';

const meta: Meta<typeof Label> = {
  title: 'Forms',
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const LabelStory: Story = {
  name: 'Label',
  render: () => (
    <Grid size={1}>
      <div>
        <Label text="Default Label" />
      </div>

      <div>
        <Label text="Disabled Label" disabled />
      </div>
    </Grid>
  ),
};

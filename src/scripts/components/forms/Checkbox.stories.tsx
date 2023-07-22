import React from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/grid/Grid';
import { Checkbox } from 'components/forms/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const CheckboxStory: Story = {
  name: 'Checkbox',
  render: () => (
    <Grid size={1}>
      <Checkbox onChange={action('Changed!')} />

      <Checkbox label="Checked" checked onChange={action('Changed!')} />

      <Checkbox label="Invalid" checked invalid onChange={action('Changed!')} />

      <Checkbox
        label="Disabled"
        checked
        disabled
        onChange={action('Changed!')}
      />

      <Checkbox
        label="Invalid + disabled"
        checked
        invalid
        disabled
        onChange={action('Changed!')}
      />
    </Grid>
  ),
};

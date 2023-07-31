import React from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
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
      <div>
        <Checkbox onChange={action('Changed!')} />
      </div>
      <div>
        <Checkbox label="Checked" checked onChange={action('Changed!')} />
      </div>
      <div>
        <Checkbox
          label="Disabled"
          checked
          disabled
          onChange={action('Changed!')}
        />
      </div>
    </Grid>
  ),
};

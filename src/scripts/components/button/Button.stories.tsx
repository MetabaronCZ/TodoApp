import React from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Button } from 'components/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Common',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
  name: 'Button',
  render: () => (
    <Grid size={1}>
      <div>
        <Button text="Default button" onClick={action('Clicked')} />
      </div>

      <div>
        <Button text="Disabled button" disabled onClick={action('Clicked')} />
      </div>

      <div>
        <Button text="Link button" href="/test" />
      </div>

      <div>
        <Button text="Link button disabled" href="/test" disabled />
      </div>

      <div>
        <Button text="With ico before" ico="+" onClick={action('Clicked')} />
      </div>

      <div>
        <Button
          text="With ico after"
          icoAfter="+"
          onClick={action('Clicked')}
        />
      </div>
    </Grid>
  ),
};

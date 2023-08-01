import React from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { TextField } from 'components/forms/TextField';
import { Row } from 'components/common/Row';

const meta: Meta<typeof TextField> = {
  title: 'Forms',
  component: TextField,
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const TextFieldStory: Story = {
  name: 'TextField',
  parameters: {
    backgrounds: { default: 'web' },
  },
  render: () => (
    <Row>
      <Grid size={1}>
        <div>
          <TextField value="Text input" onChange={action('Changed!')} />
        </div>
        <div>
          <TextField
            value="Invalid text input"
            error="Form field validation error"
            onChange={action('Changed!')}
          />
        </div>
        <div>
          <TextField
            value="Disabled text input"
            disabled
            onChange={action('Changed!')}
          />
        </div>
        <div>
          <TextField
            value="Invalid + disabled text input"
            error="Form field validation error"
            disabled
            onChange={action('Changed!')}
          />
        </div>
      </Grid>

      <Grid size={1}>
        <div>
          <TextField value="Textarea" textarea onChange={action('Changed!')} />
        </div>
        <div>
          <TextField
            value="Invalid textarea"
            error="Form field validation error"
            textarea
            onChange={action('Changed!')}
          />
        </div>
        <div>
          <TextField
            value="Disabled textarea"
            textarea
            disabled
            onChange={action('Changed!')}
          />
        </div>
        <div>
          <TextField
            value="Invalid + disabled textarea"
            error="Form field validation error"
            textarea
            disabled
            onChange={action('Changed!')}
          />
        </div>
      </Grid>
    </Row>
  ),
};

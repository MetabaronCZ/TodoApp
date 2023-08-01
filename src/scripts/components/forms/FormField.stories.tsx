import React from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { FormField } from 'components/forms/FormField';

const meta: Meta<typeof FormField> = {
  title: 'Forms',
  component: FormField,
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const FormFieldStory: Story = {
  name: 'FormField',
  parameters: {
    backgrounds: {
      default: 'web',
    },
  },
  render: () => (
    <Grid size={1}>
      <FormField
        label="Text input"
        field={{ type: 'text', value: '', onChange: action('Change!') }}
      />
      <FormField
        label="Textarea"
        field={{
          type: 'text',
          value: '',
          textarea: true,
          onChange: action('Change!'),
        }}
      />
      <FormField
        label="Checkbox"
        field={{ type: 'checkbox', value: true, onChange: action('Change!') }}
      />
      <FormField
        label="Dropdown"
        field={{
          type: 'dropdown',
          value: 1,
          options: [
            { id: '1', title: 'Item 1', value: 1 },
            { id: '2', title: 'Item 2', value: 2 },
            { id: '3', title: 'Item 3', value: 3 },
          ],
          onChange: action('Change!'),
        }}
      />
      <FormField
        label="Invalid"
        error="Form field error message!"
        field={{ type: 'text', value: '', onChange: action('Change!') }}
      />
      <FormField
        label="Vertical"
        field={{ type: 'text', value: '', onChange: action('Change!') }}
        vertical
      />
    </Grid>
  ),
};

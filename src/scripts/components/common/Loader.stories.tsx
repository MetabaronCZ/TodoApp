import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from 'components/common/Loader';

const meta: Meta<typeof Loader> = {
  title: 'Common',
  component: Loader,
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const LoaderStory: Story = {
  name: 'Loader',
  render: () => <Loader />,
};

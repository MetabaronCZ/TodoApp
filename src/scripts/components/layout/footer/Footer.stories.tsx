import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from 'components/layout/footer/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layout',
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const FooterStory: Story = {
  name: 'Footer',
  render: () => <Footer />,
};

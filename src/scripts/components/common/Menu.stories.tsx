import React from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Menu, MenuItem } from 'components/common/Menu';

const testItems: MenuItem[] = Array(5)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    title: `Item ${i + 1}`,
    active: 0 === i,
    onClick: action(`Menu item ${i + 1} clicked!`),
  }));

const meta: Meta<typeof Menu> = {
  title: 'Common',
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const MenuStory: Story = {
  name: 'Menu',
  render: () => <Menu items={testItems} />,
};

import React from 'react';
import styled from 'styled-components';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Menu, MenuItem } from 'components/common/Menu';

const testItems: MenuItem[] = Array(5)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    ico: 0 === i % 2 ? 'plus' : 'minus',
    title: `Item ${i + 1}`,
    active: 0 === i,
    onClick: action(`Menu item ${i + 1} clicked!`),
  }));

const Container = styled.div`
  max-width: 240px;
`;

const meta: Meta<typeof Menu> = {
  title: 'Common',
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const MenuStory: Story = {
  name: 'Menu',
  render: () => (
    <Container>
      <Menu items={testItems} />
    </Container>
  ),
};

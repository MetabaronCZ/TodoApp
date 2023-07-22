import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Paragraph } from 'components/common/Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'Common',
  component: Paragraph,
};

export default meta;

type Story = StoryObj<typeof Paragraph>;

export const ParagraphStory: Story = {
  name: 'Paragraph',
  render: () => (
    <Grid>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Paragraph>

      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt maxime
        nisi sapiente quidem deleniti! Quasi, nulla quibusdam pariatur enim
        ducimus ab porro? Recusandae, in nihil nulla animi minus ratione
        perferendis!
      </Paragraph>

      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ipsum
        soluta sapiente nesciunt unde perspiciatis cum? Veritatis laudantium
        doloremque cupiditate ut. Tenetur suscipit dignissimos repellat magnam
        ipsam dolor error perferendis.
      </Paragraph>
    </Grid>
  ),
};

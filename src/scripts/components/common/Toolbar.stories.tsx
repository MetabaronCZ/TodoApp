import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Toolbar } from 'components/common/Toolbar';
import { Paragraph } from 'components/common/Paragraph';

const meta: Meta<typeof Toolbar> = {
  title: 'Common',
  component: Toolbar,
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const ToolbarStory: Story = {
  name: 'Toolbar',
  render: () => (
    <Grid>
      <div>
        <Toolbar
          items={[
            <Paragraph key={0}>Default toolbar</Paragraph>,
            <Paragraph key={1}>1</Paragraph>,
            <Paragraph key={2}>2</Paragraph>,
            <Paragraph key={3}>3</Paragraph>,
          ]}
        />
      </div>

      <div>
        <Toolbar
          items={[
            <Paragraph key={0}>Toolbar with filler</Paragraph>,
            'filler',
            <Paragraph key={2}>1</Paragraph>,
            <Paragraph key={3}>2</Paragraph>,
            <Paragraph key={4}>3</Paragraph>,
          ]}
        />
      </div>

      <div>
        <Toolbar items={[<Paragraph key={0}>Sticky toolbar</Paragraph>]} />
        <Grid>
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <Paragraph key={i}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Perspiciatis velit magni officia ad, cumque ipsum eum ex impedit
                nihil odio labore perferendis alias veniam, unde vel eaque
                corporis nostrum facilis.
              </Paragraph>
            ))}
        </Grid>
      </div>
    </Grid>
  ),
};

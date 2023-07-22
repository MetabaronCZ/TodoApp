import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Link } from 'components/common/Link';
import { Paragraph } from 'components/common/Paragraph';

const meta: Meta<typeof Link> = {
  title: 'Common',
  component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const LinkStory: Story = {
  name: 'Link',
  render: () => (
    <Grid size={1}>
      <div>
        <Link href="/">Default link</Link>
      </div>

      <div>
        <Link target="_blank" href="https://www.example.com">
          External link
        </Link>
      </div>

      <Paragraph>
        <Link href="/">Link in typographical context</Link>
      </Paragraph>

      <Paragraph>
        Lorem ipsum dolor sit amet consectetur{' '}
        <Link href="/">Link in text context</Link>. Aliquam modi nesciunt
        aliquid veniam quam mollitia cum, provident a. Enim accusantium eius ut
        obcaecati! Ipsam sint fugit modi veritatis asperiores quam?
      </Paragraph>
    </Grid>
  ),
};

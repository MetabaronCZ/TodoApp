import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Layout } from 'components/layout/Layout';
import { Paragraph } from 'components/common/Paragraph';

const meta: Meta<typeof Layout> = {
  title: 'Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const LayoutStory: Story = {
  name: 'Layout',
  render: () => (
    <Layout>
      <Grid>
        <Paragraph>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
          nesciunt sequi similique dolor porro. At non ducimus autem natus, in
          cumque quisquam quaerat doloribus porro, itaque deserunt ea veniam
          ipsum.
        </Paragraph>
        <Paragraph>
          Quasi molestias officia earum rem unde quia labore neque debitis nam
          assumenda omnis repellat repudiandae quos tenetur dolores esse, sed
          eligendi asperiores in, iusto distinctio adipisci. Voluptatem
          accusantium officiis numquam?
        </Paragraph>
        <Paragraph>
          Quos, vitae eaque laboriosam soluta recusandae eius non sequi libero
          ex hic autem magni officiis facere qui reprehenderit quidem neque quis
          nesciunt eligendi sit debitis ea exercitationem at nisi? Suscipit.
        </Paragraph>
        <Paragraph>
          Doloremque minus dolorem fuga modi omnis quis sint accusantium
          molestiae ex consectetur harum quibusdam, iste corporis officiis
          tempore possimus obcaecati placeat non. Provident harum sequi maxime
          odit labore repellendus quis!
        </Paragraph>
        <Paragraph>
          Maiores, numquam, tenetur ducimus magnam aperiam hic vitae voluptas
          asperiores, quas perspiciatis eveniet unde! Fugiat, dignissimos ullam
          hic vitae odio enim molestias consequuntur minima dolor, iste
          perspiciatis, sapiente quidem nesciunt?
        </Paragraph>
      </Grid>
    </Layout>
  ),
};

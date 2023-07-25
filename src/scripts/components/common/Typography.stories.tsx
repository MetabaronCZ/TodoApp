import React from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import type { StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Text } from 'components/common/Typography';
import { Paragraph } from 'components/common/Paragraph';

type ExampleComponent = StyledComponent<'div', DefaultTheme>;

const items: Array<[string, ExampleComponent]> = Object.entries(Text).map(
  ([name, styles]) => [
    name,
    styled.div`
      ${styles};
    `,
  ],
);

export default {
  title: 'Typography',
};

export const TypographyStory: StoryObj = {
  name: 'Typography',
  render: () => (
    <Grid>
      {items.map(([name, Component]) => (
        <Grid size={1} key={name}>
          <Paragraph>Text: {name}</Paragraph>
          <Component>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates, vitae aperiam consectetur maiores debitis mollitia
            exercitationem amet animi nesciunt, enim vel! Necessitatibus iste
            dolorem voluptatibus facilis fugit deserunt placeat repudiandae.
          </Component>
        </Grid>
      ))}
    </Grid>
  ),
};

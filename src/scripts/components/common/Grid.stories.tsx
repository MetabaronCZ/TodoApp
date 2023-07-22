import React from 'react';
import styled from 'styled-components';
import type { Meta, StoryObj } from '@storybook/react';

import { Row } from 'components/common/Row';
import { Grid } from 'components/common/Grid';
import { Paragraph } from 'components/common/Paragraph';

const StyledParagraph = styled(Paragraph)`
  background: ${({ theme }) => theme.color.background};
`;

const meta: Meta<typeof Grid> = {
  title: 'Common',
  component: Grid,
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const GridStory: Story = {
  name: 'Grid',
  render: () => (
    <Row>
      {[0, 1, 2].map((size) => (
        <Grid size={1} key={size}>
          <Paragraph>Size: {size}</Paragraph>
          <Grid size={size}>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <StyledParagraph key={i}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  neque, rerum, incidunt illum laudantium possimus.
                </StyledParagraph>
              ))}
          </Grid>
        </Grid>
      ))}
    </Row>
  ),
};

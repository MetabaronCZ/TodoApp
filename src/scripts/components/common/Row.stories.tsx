import React from 'react';
import styled from 'styled-components';
import type { Meta, StoryObj } from '@storybook/react';

import { Row } from 'components/common/Row';
import { Grid } from 'components/common/Grid';
import { Paragraph } from 'components/common/Paragraph';

const StyledParagraph = styled(Paragraph)`
  background: ${({ theme }) => theme.color.background};
`;

const meta: Meta<typeof Row> = {
  title: 'Grid',
  component: Row,
};

export default meta;

type Story = StoryObj<typeof Row>;

export const RowStory: Story = {
  name: 'Row',
  render: () => (
    <Grid>
      {[0, 1, 2].map((size) => (
        <Grid size={1} key={size}>
          <Paragraph>Size: {size}</Paragraph>
          <Row size={size}>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <StyledParagraph key={i}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  neque, rerum, incidunt illum laudantium possimus.
                </StyledParagraph>
              ))}
          </Row>
        </Grid>
      ))}
    </Grid>
  ),
};

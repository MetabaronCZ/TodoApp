import React from 'react';
import styled from 'styled-components';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Text } from 'components/common/Typography';
import { TextOverflow } from 'components/common/TextOverflow';

import { toVU } from 'modules/theme';

const Container = styled(Grid)`
  max-width: 320px;
`;

const Component = styled.div`
  ${Text.Base};
  ${TextOverflow};
  padding: ${toVU(1)};
  background: ${({ theme }) => theme.color.active};
`;

const meta: Meta = {
  title: 'Common',
};

export default meta;

type Story = StoryObj;

export const TextOverflowStory: Story = {
  name: 'TextOverflow',
  render: () => (
    <Container size={1}>
      <Component>Short text.</Component>
      <Component>
        Overflown text: Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Explicabo recusandae ut libero voluptates doloremque consequatur
        eos nisi itaque aspernatur beatae dolore impedit, iusto quod!
        Reprehenderit sapiente minus consequuntur quidem tempore?.
      </Component>
    </Container>
  ),
};

import React from 'react';
import styled from 'styled-components';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from 'components/common/Grid';
import { Text } from 'components/common/Typography';
import { UpdatedContent } from 'components/common/UpdatedContent';

import { toVU } from 'modules/theme';

interface StyledProps {
  readonly $loading?: boolean;
}

const Component = styled.div<StyledProps>`
  ${Text.Base};
  ${UpdatedContent};
  padding: ${toVU(1)};
  background: ${({ theme }) => theme.color.active};
`;

const meta: Meta = {
  title: 'Common',
};

export default meta;

type Story = StoryObj;

export const UpdatedContentStory: Story = {
  name: 'UpdatedContent',
  render: () => (
    <Grid size={1}>
      <Component $loading={false}>Non-updated content.</Component>
      <Component $loading={true}>Updated content.</Component>
    </Grid>
  ),
};

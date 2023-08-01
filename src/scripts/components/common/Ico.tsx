import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/common/Typography';

import { icos } from 'modules/icos';
import { toVU } from 'modules/theme';
import { ColorId, colors } from 'modules/colors';

export type IcoId = keyof typeof icos;

const Container = styled.i`
  ${Text.Base};
  display: block;
  width: ${toVU(2)};
  height: ${toVU(2)};
  line-height: ${toVU(2)};
  font-style: normal;
  text-align: center;
  user-select: none;
`;

interface Props {
  readonly ico: IcoId;
  readonly color?: ColorId | null;
}

export const Ico: React.FC<Props> = ({ ico, color }) => (
  <Container style={{ color: color ? colors[color] : undefined }}>
    {icos[ico]}
  </Container>
);

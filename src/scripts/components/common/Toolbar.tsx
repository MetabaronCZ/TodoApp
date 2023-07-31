import React from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';

// alias for inserted filler element
const filler = 'filler';
type FillerType = typeof filler;

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.toolbar};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1)};
  height: calc(${toVU(3)} + 1px);
  border-bottom: ${({ theme }) => theme.border.light};
  background: ${({ theme }) => theme.color.background};
`;

const Filler = styled.div`
  flex: 1;
`;

interface Props {
  readonly items: Array<JSX.Element | FillerType | null>;
}

export const Toolbar: React.FC<Props> = ({ items }) => {
  items = items.filter((item) => !!item);

  if (0 === items.length) {
    return;
  }
  return (
    <Container>
      {items.map((item, i) =>
        filler === item ? <Filler key={i} /> : <div key={i}>{item}</div>,
      )}
    </Container>
  );
};

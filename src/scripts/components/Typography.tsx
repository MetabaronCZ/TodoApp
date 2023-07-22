import { css } from 'styled-components';

const Base = css`
  font-family: ${({ theme }) => theme.font.default};
  font-size: ${({ theme }) => theme.fontSize.default};
  line-height: ${({ theme }) => theme.lineHeight.default};
  color: ${({ theme }) => theme.color.base};
`;

export const Text = {
  Base,
};

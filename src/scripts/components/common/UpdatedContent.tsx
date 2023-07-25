import { css } from 'styled-components';

interface StyledProps {
  readonly $loading?: boolean;
}

export const UpdatedContent = css<StyledProps>`
  opacity: ${({ $loading }) => ($loading ? 0.5 : '')};
  user-select: ${({ $loading }) => ($loading ? 'none' : '')};
  pointer-events: ${({ $loading }) => ($loading ? 'none' : '')};
`;

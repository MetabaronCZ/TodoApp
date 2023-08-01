import { css } from 'styled-components';

const BaseStyles = css`
  font-family: ${({ theme }) => theme.font.default};
  color: ${({ theme }) => theme.color.base};
`;

const Base = css`
  ${BaseStyles};
  font-size: ${({ theme }) => theme.fontSize.default};
  line-height: ${({ theme }) => theme.lineHeight.default};
`;

const Small = css`
  ${BaseStyles};
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: ${({ theme }) => theme.lineHeight.small};
`;

const Large = css`
  ${BaseStyles};
  font-size: ${({ theme }) => theme.fontSize.large};
  line-height: ${({ theme }) => theme.lineHeight.large};
`;

export const Text = {
  Base,
  Small,
  Large,
};

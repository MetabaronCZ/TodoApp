import { DefaultTheme } from 'styled-components';
import { colors } from './colors';

export const VU = 8; // vertical unit
export const toVU = (count: number): string => `${VU * count}px`;

export const theme: DefaultTheme = {
  color: colors,
  font: {
    default: 'Tahoma, Verdana, Arial, sans-serif',
  },
  fontSize: {
    default: '16px',
  },
  lineHeight: {
    default: toVU(3),
  },
  dimension: {
    pageMinWidth: '320px',
  },
};

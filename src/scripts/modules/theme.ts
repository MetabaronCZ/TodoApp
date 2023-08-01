import { DefaultTheme } from 'styled-components';
import { colors } from './colors';

export const VU = 10; // vertical unit
export const toVU = (count: number): string => `${VU * count}px`;

export const theme: DefaultTheme = {
  color: colors,
  font: {
    default: 'Open Sans, Arial, sans-serif',
  },
  fontSize: {
    default: '14px',
    small: '12px',
    large: '18px',
  },
  lineHeight: {
    default: toVU(2),
    small: toVU(2),
    large: toVU(3),
  },
  border: {
    default: `1px solid ${colors.base}`,
    light: `1px solid ${colors.active}`,
    forms: `2px solid ${colors.base}`,
    formsInvalid: `2px solid ${colors.error}`,
    formsDisabled: `2px solid ${colors.disabled}`,
  },
  outline: {
    default: `1px dotted ${colors.base}`,
    action: `1px dotted ${colors.action}`,
    invalid: `1px dotted ${colors.error}`,
  },
  dimension: {
    pageMinWidth: '320px',
    pageMaxWidth: '980px',
    menuColumnWidth: '240px',
  },
  zIndex: {
    toolbar: 1000,
    dropdown: 10000,
  },
};

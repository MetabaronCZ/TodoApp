export const colors = {
  base: '#222',
  background: '#f0f0f0',
  action: '#22c',
  field: '#fff',
  error: '#c22',
  success: '#2c2',
  hoverLight: '#fcfcfc',
  hoverDark: '#e0e0e0',
  active: '#c0c0c0',
  disabled: '#c0c0c0',
};
export type ColorId = keyof typeof colors;

const shorthandColorRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const fullColorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

// convert hexadecimal color string to RGB color string
export const hexToRgb = (hexaColor: string): string | null => {
  // convert shorthand form
  hexaColor = hexaColor.replace(shorthandColorRegex, (m, r, g, b) => {
    return `${r}${r}${g}${g}${b}${b}`;
  });

  // get RGB parts
  const rgbParts = fullColorRegex.exec(hexaColor);

  if (!rgbParts) {
    return null;
  }
  const r = parseInt(rgbParts[1], 16);
  const g = parseInt(rgbParts[2], 16);
  const b = parseInt(rgbParts[3], 16);

  return `rgb(${r}, ${g}, ${b})`;
};

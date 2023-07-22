import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  // CSS reset
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    margin: 0;
    padding: 0;
  }
`;

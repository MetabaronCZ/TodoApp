import { pathFonts } from 'modules/paths';
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

  // fonts
  @font-face {
    font-family: 'Open Sans';
    src:
      url('${pathFonts}/OpenSans-Regular.woff2') format('woff2'),
      url('${pathFonts}/OpenSans-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src:
      url('${pathFonts}/OpenSans-Bold.woff2') format('woff2'),
      url('${pathFonts}/OpenSans-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }
`;

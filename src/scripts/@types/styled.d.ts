import 'styled-components';
import { colors } from 'modules/colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly color: typeof colors;
    readonly font: {
      readonly default: string;
    };
    readonly fontSize: {
      readonly default: string;
    };
    readonly lineHeight: {
      readonly default: string;
    };
    readonly dimension: {
      readonly pageMinWidth: string;
    };
  }
}

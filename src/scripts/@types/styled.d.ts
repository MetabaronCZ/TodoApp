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
      readonly small: string;
      readonly large: string;
    };
    readonly lineHeight: {
      readonly default: string;
      readonly small: string;
      readonly large: string;
    };
    readonly border: {
      readonly default: string;
      readonly light: string;
      readonly forms: string;
      readonly formsInvalid: string;
      readonly formsDisabled: string;
    };
    readonly outline: {
      readonly default: string;
      readonly action: string;
      readonly invalid: string;
    };
    readonly dimension: {
      readonly pageMinWidth: string;
      readonly pageMaxWidth: string;
      readonly menuColumnWidth: string;
    };
    readonly zIndex: {
      readonly toolbar: number;
      readonly dropdown: number;
    };
  }
}

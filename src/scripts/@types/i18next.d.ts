import 'i18next';

import csTranslation from 'localization/cs.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'cs';
    resources: {
      cs: typeof csTranslation;
    };
  }
}

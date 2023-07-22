import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { ENV } from 'modules/env';
import csTranslation from 'localization/cs.json';

export const i18n = i18next.use(initReactI18next).init({
  resources: {
    cs: {
      translation: csTranslation,
    },
  },
  lng: 'cs',
  fallbackLng: 'cs',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false,
  },
  debug: ENV.isDev,
});

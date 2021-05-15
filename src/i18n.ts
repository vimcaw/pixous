import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { mapKeys, mapValues } from 'lodash';
import en from './lang/en';

const languages = import.meta.globEager('./lang/*.ts') as Record<string, { default: typeof en }>;

// the translations
export const resources = mapValues(
  mapKeys(languages, (_, key) => key.replace(/^\.\/lang\/(.+)\.ts$/, '$1')),
  item => ({ translation: item.default })
);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

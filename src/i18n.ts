import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import zhTW from '../locales/zh-TW.json';
import enUS from '../locales/en-US.json';

i18n
  .use(LanguageDetector) // Automatically detect user's language
  .use(initReactI18next)
  .init({
    resources: {
      'zh-TW': { translation: zhTW },
      'en-US': { translation: enUS },
    },
    lng: localStorage.getItem('language') || 'en-US', // Default to stored language
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });

export default i18n;

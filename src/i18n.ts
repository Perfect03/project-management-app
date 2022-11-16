import en from './locales/en.json';
import ru from './locales/ru.json';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: JSON.parse(localStorage.getItem('language') as string),
  fallbackLng: 'en',
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh.json';
import en from './en.json';
import ko from './ko.json';
import ja from './ja.json';
import vi from './vi.json';
import ar from './ar.json';
import ru from './ru.json';
import es from './es.json';
import pt from './pt.json';

export const LANGUAGES = ['zh', 'en', 'ko', 'ja', 'vi', 'ar', 'ru', 'es', 'pt'] as const;
export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_NAMES: Record<string, string> = {
  zh: '中文',
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  vi: 'Tiếng Việt',
  ar: 'العربية',
  ru: 'Русский',
  es: 'Español',
  pt: 'Português',
};

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en },
    ko: { translation: ko },
    ja: { translation: ja },
    vi: { translation: vi },
    ar: { translation: ar },
    ru: { translation: ru },
    es: { translation: es },
    pt: { translation: pt },
  },
  lng: 'zh',
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

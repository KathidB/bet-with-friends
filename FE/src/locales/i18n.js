import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './en.json'
import plTranslations from './pl.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      pl: {
        translation: plTranslations
      }
      // Add more languages if needed
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language in case translation not found
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      wait: true
    }
  })

export default i18n

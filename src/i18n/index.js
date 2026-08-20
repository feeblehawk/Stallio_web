import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// ─── English ──────────────────────────────────────────────────────────────────
import enCommon   from './locales/en/common.json'
import enHome     from './locales/en/home.json'
import enFeatures from './locales/en/features.json'
import enHowitworks from './locales/en/howitworks.json'
import enPricing  from './locales/en/pricing.json'
import enAbout    from './locales/en/about.json'
import enContact  from './locales/en/contact.json'
// import enBlog     from './locales/en/blog.json'

// ─── Spanish ─────────────────────────────────────────────────────────────────
import esCommon   from './locales/es/common.json'
import esHome     from './locales/es/home.json'
import esFeatures from './locales/es/features.json'
import esHowitworks from './locales/es/howitworks.json'
import esPricing from './locales/es/pricing.json'
import esAbout    from './locales/es/about.json'
import esContact from './locales/es/contact.json'

// ─── Arabic ─────────────────────────────────────────────────────────────────
import arCommon   from './locales/ar/common.json'
import arHome     from './locales/ar/home.json'
import arFeatures from './locales/ar/features.json'
import arHowitworks from './locales/ar/howitworks.json'
import arPricing from './locales/ar/pricing.json'
import arAbout    from './locales/ar/about.json'
import arContact from './locales/ar/contact.json'
// ─── Supported languages ─────────────────────────────────────────────────────
export const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦' },
]

const updateDocumentDirection = (lng) => {
  if (typeof document !== 'undefined') {
    const isRtl = lng === 'ar'
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = lng || 'en'
    if (isRtl) {
      document.documentElement.classList.add('rtl')
    } else {
      document.documentElement.classList.remove('rtl')
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, home: enHome, features: enFeatures, howitworks: enHowitworks, pricing: enPricing, about: enAbout, contact: enContact },
      es: { common: esCommon, home: esHome, features: esFeatures, howitworks: esHowitworks, pricing: esPricing, about: esAbout, contact: esContact },
      ar: { common: arCommon, home: arHome, features: arFeatures, howitworks: arHowitworks, pricing: arPricing, about: arAbout, contact: arContact },
    },

    // Fallback to English if a key is missing in the active language
    fallbackLng: 'en',

    // Namespaces — 'common' is the default so simple t('key') works for nav/UI
    defaultNS: 'common',
    ns: ['common', 'home', 'features', 'howitworks', 'pricing', 'about', 'contact'],

    // Language detection order
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'stallio_lang',
      caches: ['localStorage'],
    },

    interpolation: {
      // React already escapes by default
      escapeValue: false,
    },
  })

// Set direction on init
updateDocumentDirection(i18n.resolvedLanguage || i18n.language || 'en')

// Set direction on change
i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng)
})

export default i18n
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translations
import dashboard from './translations/pages/dashboard'
import login from './translations/pages/login'
import map from './translations/pages/map'
import home from './translations/pages/home'
import layout from './translations/layout'
import ui from './translations/ui'

export const supportedLngs = ["fr", "de", "lu", "en"]

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'fr',
        supportedLngs,
        interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        fr: {
            translation: {
                pages: {
                    dashboard: dashboard.fr,
                    login: login.fr,
                    home: home.fr,
                    map: map.fr,
                },
                layout: layout.fr,
                ui: ui.fr
            }
        },
        en: {
            translation: {
                pages: {
                    dashboard: dashboard.en,
                    login: login.en,
                    home: home.en,
                    map: login.en,
                },
                layout: layout.en,
                ui: ui.en,
            }
        },
        de: {
            translation: {
                pages: {
                    dashboard: dashboard.de,
                    login: login.de,
                    home: home.de,
                    map: map.de,
                },
                layout: layout.de,
                ui: ui.de,
            }
        },
        lu: {
            translation: {
                pages: {
                    dashboard: dashboard.lu,
                    login: login.lu,
                    home: home.lu,
                    map: map.lu,
                },
                layout: layout.lu,
                ui: ui.lu,
            }
        },
    }
})

export default i18n
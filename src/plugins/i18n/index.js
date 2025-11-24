import { createI18n } from 'vue-i18n'
import en from './en.json'
import ar from './ar.json'

let lang = 'en'

if (typeof localStorage.lang != 'undefined') {
  lang = localStorage.getItem('lang')
} else {
  localStorage.setItem('lang', 'en')
}


const i18n = createI18n({
  legacy:false,
  locale: lang,
  messages: {
    en: en,
    ar: ar,
  },
})

document.documentElement.lang = lang
document.documentElement.dir = lang=='ar' ? 'rtl': 'ltr'

export default i18n
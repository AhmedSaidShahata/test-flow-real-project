import { localize, setLocale } from '@vee-validate/i18n'
import { defineRule, configure } from 'vee-validate'
// import { required, between, email, confirmed, size, mimes } from '@vee-validate/rules';
import en from '../i18n/en.json'
import ar from '../i18n/ar.json'
import i18n from '@/plugins/i18n'
import { all } from '@vee-validate/rules'

const { t } = i18n.global

configure({
  generateMessage: localize({
    ar,
    en
  })
})

let locale = localStorage.getItem('lang') || 'en'
setLocale(locale)
export default {
  install(app) {
    Object.entries(all).forEach(([name, rule]) => {
      defineRule(name, rule)
    })

    defineRule('mimes', (value, types) => {
      if (!value || value.length === 0) return true
      const allowed = types.map((type) => type.trim())
      const files = Array.isArray(value) ? value : [value]
      const invalid = files.find((file) => !allowed.includes(file.type))
      const displayTypes = allowed.map((type) => type.split('/')[1] || type)
      return invalid ? `${t('messages.mimes')} ${displayTypes.join(', ')}` : true
    })

    defineRule('length', (value, [max] = []) => {
      const maxCount = parseInt(max ?? '5', 10)
      const count = value?.length || 0
      if (count > maxCount) {
        return `${t('messages.length')} ${maxCount} ${t('files')} ${t('max_at_a_time')}`
      }
      return true
    })
    defineRule('numeric_max', (value, [maxLength] = []) => {
      if (!value) return true

      const maxCount = parseInt(maxLength ?? '15', 10)

      if (!/^\d+$/.test(value)) {
        return t('messages.numeric')
      }

      if (value.length > maxCount) {
        return t('messages.numeric_max', { length: maxCount })
      }

      return true
    })
    defineRule('numeric_min', (value, [minLength] = []) => {
      if (!value) return true

      const minCount = parseInt(minLength ?? '0', 10)

      if (!/^\d+$/.test(value)) {
        return t('messages.numeric')
      }

      if (value.length < minCount) {
        return t('messages.numeric_min', { length: minCount })
      }

      return true
    })
  }
}

<template>
  <v-select
    variant="solo"
    v-model="locale"
    :items="items"
    item-title="name"
    item-value="value"
    @update:model-value="changeLocale"
    persistent-hint
    :hint="hint ?? t('select-language-hint')"
    class="locale-selector-input"
  >
    <template v-slot:prepend-inner>
      <Image :name="customIcon" height="20px" width="20px" />
    </template>

    <template v-slot:append-inner>
      <Image name="select-arrow.svg" height="20px" width="20px" />
    </template>
  </v-select>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useLocaleStore } from '@/stores/locale'
import { useLocaleCurrentAppStore } from '@/stores/localeCurrentApp'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  customIcon: {
    type: String,
    default: 'locale-globe.svg'
  }
})
const { t } = useI18n()

const { setLocaleApp } = useLocaleStore()
const { setLocaleCurrentApp } = useLocaleCurrentAppStore()

const locale = ref('en')
const emit = defineEmits(['changed'])

const items = computed(() => [
  { name: t('languages.en'), value: 'en' },
  { name: t('languages.ar'), value: 'ar' }
])

const changeLocale = (locale) => {
  setLocaleCurrentApp(locale)
  setLocaleApp(locale)
  emit('changed')
  nextTick(() => {
    setLocaleCurrentApp(localStorage.getItem('lang'))
  })
}

onBeforeUnmount(() => {
  let currentLocale = localStorage.getItem('lang')
  setLocaleApp(currentLocale)
})

onMounted(() => {
  locale.value = localStorage.getItem('lang') || 'en'
  setLocaleApp(locale.value)
})
</script>
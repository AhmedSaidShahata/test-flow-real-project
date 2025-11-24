import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLocaleCurrentAppStore = defineStore('localeCurrentApp', () => {
    const localeCurrentApp = ref(localStorage.getItem("lang") || 'ar')
    const localeCurrentAppValue = computed(() => localeCurrentApp)
    const setLocaleCurrentApp = (item) => {
        localeCurrentApp.value = item
    }
    return { setLocaleCurrentApp, localeCurrentAppValue }
})




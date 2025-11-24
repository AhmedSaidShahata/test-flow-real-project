import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', () => {
    const locale = ref(localStorage.getItem("lang") || 'ar')
    const localeValue = computed(() => locale)
    const setLocaleApp = (item) => {
        locale.value = item
    }
    return { setLocaleApp, localeValue }
})




import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', () => {

    const drawer = ref(true)

    const drawerResult = computed(() => drawer)

    const setDrawer = (item) => {
        drawer.value = item
    }

    const toggleDrawer = () => {
        drawer.value = !drawer.value
    }

    return { setDrawer, toggleDrawer, drawerResult }
})




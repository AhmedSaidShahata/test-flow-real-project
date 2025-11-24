<template>
  <v-app-bar color="#9368F9" class="rounded-b-xl header mx-lg-4 mx-0 elevation-0 px-md-6 py-2">
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      variant="text"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>

    <div class="d-flex justify-center align-center">
      <Button
        class="font-weight-bold v-avatar text-center bg-transparent profile-image me-3 px-0 d-flex"
        radius="15px"
        height="auto"
        width="auto"
        min-width="50px"
        :to="`/profile`"
      >
        <v-avatar rounded="0" size="50" variant="outlined">
          <v-img v-if="authStore.user?.image?.path" :src="authStore.user?.image?.path" class="w-100"></v-img>
          <v-icon style="cursor: default;" v-else size="60px" icon="mdi-account" ></v-icon>
        </v-avatar>
        <div class="edit-icon position-absolute">
          <Image name="edit-profile.svg" class="edit-icon__img w-100" />
        </div>
      </Button>
      <!-- <div class="profile-image me-3 cursor-pointer">
        <v-avatar rounded="0" size="50" variant="outlined">
          <Image name="profile.png" class="w-100" />
          <div class="edit-icon">
            <Image name="edit-profile.svg" class="edit-icon__img w-100" />
          </div>
        </v-avatar>
      </div> -->
      <div>
        <div class="user-name " v-html="`${authStore?.user?.firstname} ${authStore?.user?.lastname}`" />
        <div class="user-role " v-html="authStore?.user?.role?.name" />
      </div>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <!-- <Button class=" bg-transparent" color="transparent ">
        <Image name="notify.svg" class="notify-icon" />
      </Button > -->
      <Button class="mx-4 mx-md-0 px-2  bg-white font-weight-bold" radius="11px" color="white" @click="changeLang">
        <span v-if="lang === 'ar'">ENG</span>
        <span v-else>العربية</span>
        <Image width="20px" class="ms-2" name="global-edit.svg" />
      </Button>
    </div>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import vuetify from '../../../../plugins/vuetify'
import { useDrawerStore } from '../../../../stores/drawer'
import { useAuthStore } from '../../../../stores/auth'
import { useCountriesStore } from '@/stores/countries'

if (localStorage.getItem('_token')) {
  await useAuthStore().getUser()
}

const authStore = useAuthStore()
const { drawerResult, toggleDrawer } = useDrawerStore()
const lang = ref('')
const currentLang = () => {
  lang.value = localStorage.getItem('lang')
}
const form = ref({
  search: ''
})

const changeLang = () => {
  lang.value = lang.value === 'ar' ? 'en' : 'ar'
  localStorage.setItem('lang', lang.value)
  window.location.reload()
}

const handleDirection = () => {
  vuetify.rtl = lang.value === 'ar'
}

onMounted(async () => {
  currentLang()
  handleDirection()
  await useCountriesStore().getCountries()

})
</script>

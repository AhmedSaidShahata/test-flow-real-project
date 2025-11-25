<template>
  <v-locale-provider :rtl="$i18n.locale == 'ar'">
    <Notification />
    <router-view></router-view>
  </v-locale-provider>
</template>

<script setup>
import Notification from "@/components/Shared/Notification/index.vue";
</script>

<style lang="scss">
@use '~/assets/scss/main.scss';
</style>

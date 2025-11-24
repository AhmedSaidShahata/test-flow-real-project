<template>
  <!-- Notification component using v-snackbar -->
  <v-snackbar location="top" opacity="1" v-model="notify.visible" :color="notify.color" variant="plain" :class="`notification--${notify.color}`">
    <div class="snack d-flex justify-center flex-column flex-md-row align-center">
      <span class="notification__text me-5">
        {{ notify.text }}
      </span>
      <span class="  d-flex flex-column justify-center">
        <Image :name="`${notify.color}-icon.svg`" class="notification__image"/>
      </span>
    </div>
  </v-snackbar>
</template>

<script setup>
import { useNotificationStore } from "@/stores/notification";
const { notify } = useNotificationStore();
</script>
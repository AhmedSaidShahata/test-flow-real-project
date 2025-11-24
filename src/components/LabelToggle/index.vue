<template>
  <v-card
    class="d-flex align-center justify-space-between pa-2"
    flat
    color="#F7F3FF"
    style="height: 48px;border-radius: 20px;"
  >
    <span class="text-black font-size-16">{{ form[name]? $t('not-activate') : $t('activate') }}</span>
    <v-switch v-model="form[name]" inset class="switch-toggle mt-5 label-toggle"  />
  </v-card>
</template>

<script setup>

const props = defineProps(["form", "name", "label"]);
</script>


<template>
  <v-radio-group>
    <v-radio
      :label="item"
      v-for="item in items"
      :key="item"
      :value="item"
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <v-radio-group >
    <v-radio v-for="item in items" :label="item[text]" :key="item[value]" :value="item[value]"></v-radio>
  </v-radio-group>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  value: {
    type: String,
    default: "value",
  },
  text: {
    type: String,
    default: "text",
  },
});
</script>

<template>
  <v-switch
    inset
    class="switch-toggle"
    hideDetails
    :model-value="value"
    @update:modelValue="emit('update:value', $event)"
  />
</template>

<script setup>
defineProps(['value']);
const emit = defineEmits(['update:value']);
</script>
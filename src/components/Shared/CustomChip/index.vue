<template>
  <v-chip 
    variant="outlined" 
    :class="chipClass"
    class="justify-center"
  >
    {{ chipText }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  value: {
    type: Boolean,
    required: true
  }
})

const chipClass = computed(() => {
  return props.value ? 'success' : 'error'
})

const chipText = computed(() => {
  return props.value ? t('yes') : t('no')
})
</script>

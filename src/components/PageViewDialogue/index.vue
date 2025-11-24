<template>
  <v-dialog v-model="localDialog" max-width="600px" class="destroy custom-dialog">
    <v-card class="rounded-xl">
      <h3 class="text-center pt-4">{{ $t('view') }} {{ selectedPage?.name }}</h3>

      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">{{ $t('loading') }}</p>
      </div>

      <!-- Message Content -->
      <div v-else-if="selectedPage" class="px-12 py-4">
        <v-row class="d-flex flex-wrap">
          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2 ps-2">{{ $t('name') }}</div>
              <div class="my-2 ps-1">{{ selectedPage?.name }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2 ps-2">{{ $t('path') }}</div>
              <div class="my-2 ps-1">{{ selectedPage?.path }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="4"
          v-if="selectedPage?.title">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2 ps-2">{{ $t('title') }}</div>
              <div class="my-2">{{ selectedPage?.title }}</div>
            </div>
          </v-col>

          <v-col cols="12">
            <div class="text-center"
            v-if="selectedPage?.description">
              <div class="bg-primary-25 rounded-xl py-2 ps-2 w-md-25">{{ $t('description') }}</div>
              <div class="my-2 text-md-start" v-html="selectedPage?.description"></div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-8">
        <p>{{ $t('error_msg') }}</p>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  selectedPage: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'dialog-closed'])

const localDialog = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

watch(localDialog, (newValue, oldValue) => {
  if (oldValue && !newValue) {
    emit('dialog-closed')
  }
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString()
}

const truncateText = (text, maxLength) => {
  if (!text) return '-'
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>

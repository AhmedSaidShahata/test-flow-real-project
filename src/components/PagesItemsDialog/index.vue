<template>
  <v-dialog v-model="localDialog" max-width="1000px" class="destroy custom-dialog">
    <v-card class="rounded-xl">
      <h3 class="text-center pt-4">{{ $t('view') }} {{ selectedItem?.name }}</h3>

      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">{{ $t('loading') }}</p>
      </div>

      <!-- Message Content -->
      <div v-else-if="selectedItem" class="px-11 py-4">
        <v-row class="d-flex flex-wrap">
          <v-col cols="12" md="6" lg="3">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('name') }}</div>
              <div class="my-2 ps-1">{{ selectedItem?.name }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="3"
          v-if="selectedItem?.title">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('title') }}</div>
              <div class="my-2">{{ selectedItem?.title }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="6"
          v-if="selectedItem?.description">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('description') }}</div>
              <div class="my-2" v-html="selectedItem?.description"></div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('section_identifier') }}</div>
              <div class="my-2" v-html="selectedItem?.section?.identifier"></div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('section_name') }}</div>
              <div class="my-2" v-html="selectedItem?.section?.name"></div>
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="6"
          v-if="selectedItem?.section?.title">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('section_title') }}</div>
              <div class="my-2" v-html="selectedItem?.section?.title"></div>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  selectedItem: {
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

const truncateText = (text, maxLength) => {
  if (!text) return '-'
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>

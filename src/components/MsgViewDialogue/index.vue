<template>
  <v-dialog v-model="localDialog" max-width="600px" class="destroy custom-dialog">
    <v-card class="rounded-xl">
      <h3 class="text-center py-4">{{ $t('view_msg') }}</h3>

      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">{{ $t('loading') }}</p>
      </div>

      <!-- Message Content -->
      <div v-else-if="selectedMessage" class="pa-4">
        <v-row class="d-flex flex-wrap">
          <v-col cols="12" md="6" lg="3">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('name') }}</div>
              <div class="my-2">{{ selectedMessage?.person_name }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('person_email') }}</div>
              <div class="my-2">{{ selectedMessage?.person_email }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="5">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('contact_phone') }}</div>
              <div class="my-2">
                {{ selectedMessage?.phone?.country_code }}{{ selectedMessage?.phone?.number }}
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('contact_topic_name') }}</div>
              <div class="my-2">{{ selectedMessage?.contact_topic?.name }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('sent_at') }}</div>
              <div class="my-2">{{ formatDate(selectedMessage?.created_at) }}</div>
            </div>
          </v-col>

          <v-col cols="12" md="6" lg="5">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('msg_body') }}</div>
              <div class="my-2 message-body">{{ selectedMessage?.body }}</div>
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
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  selectedMessage: {
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
  const { locale } = useI18n()
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString(locale?.value)
}
</script>


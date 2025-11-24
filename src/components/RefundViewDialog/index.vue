<template>
  <v-dialog v-model="localDialog" max-width="785px" class="destroy custom-dialog">
    <v-card class="rounded-xl">
      <h3 class="text-center py-4">{{ $t('view_msg') }}</h3>

      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">{{ $t('loading') }}</p>
      </div>

      <!-- Message Content -->
      <div v-else-if="selectedMessage" class="py-4 px-7">
        <v-row class="d-flex flex-wrap">

            <!-- Person name -->
          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-1">{{ $t('person_name') }}</div>
              <div class="my-2">{{ selectedMessage?.person_name }}</div>
            </div>
          </v-col>
          
          <!-- Person Email -->
          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-1">{{ $t('person_email') }}</div>
              <div class="my-2">{{ selectedMessage?.person_email }}</div>
            </div>
          </v-col>

          <!-- Phone Number -->
          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-1">{{ $t('contact_phone') }}</div>
              <div class="my-2">{{ selectedMessage?.phone?.country_code }}{{ selectedMessage?.phone?.number }}</div>
            </div>
          </v-col>
          
            <!-- Order Number -->
          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-1">{{ $t('order_number') }}</div>
              <div class="my-2">{{ selectedMessage?.order_number }}</div>
            </div>
          </v-col>

            <!-- National ID -->
          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-1">{{ $t('national_id') }}</div>
              <div class="my-2">{{ selectedMessage?.national_id }}</div>
            </div>
          </v-col>
          
            <!-- Reasons -->
          <v-col cols="12" md="6" lg="4">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-1">{{ $t('reasons') }}</div>
              <div class="my-2 message-body">{{ selectedMessage?.reasons }}</div>
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
</script>

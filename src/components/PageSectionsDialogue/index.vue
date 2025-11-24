<template>
  <v-dialog v-model="localDialog" max-width="1100px" class="destroy custom-dialog">
    <v-card class="rounded-xl">
      <h3 class="text-center pt-4">{{ $t('sections_dialog.h1') }} {{ selectedSection?.name }}</h3>

      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">{{ $t('loading') }}</p>
      </div>

      <!-- Message Content -->
      <div v-else-if="selectedSection" class="pa-4">
        <section class="d-flex flex-wrap">
          <article class="dialog__section">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('name') }}</div>
              <div class="my-2">{{ selectedSection?.name }}</div>
            </div>
          </article>

          <article class="dialog__section"
          v-if="selectedSection?.title">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('title') }}</div>
              <div class="my-2">{{ selectedSection?.title }}</div>
            </div>
          </article>

          <article class="dialog__section"
          v-if="selectedSection?.description">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('description') }}</div>
              <div class="my-2 message-body" v-html="selectedSection?.description"></div>
            </div>
          </article>

          <article class="dialog__section">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">
                {{ $t('sections_dialog.has_items_title') }}
              </div>
              <div class="my-2">
                <CustomChip :value="selectedSection?.has_items_title" />
              </div>
            </div>
          </article>

          <article class="dialog__section">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('sections_dialog.path') }}</div>
              <div class="my-2">{{ selectedSection?.page?.path }}</div>
            </div>
          </article>

          <article class="dialog__section">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('sections_dialog.has_title') }}</div>
              <div class="my-2">
                <CustomChip :value="selectedSection?.has_title" />
              </div>
            </div>
          </article>

          <article class="dialog__section">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">
                {{ $t('sections_dialog.has_description') }}
              </div>
              <div class="my-2">
                <CustomChip :value="selectedSection?.has_description" />
              </div>
            </div>
          </article>

          <article class="dialog__section">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('sections_dialog.has_items') }}</div>
              <div class="my-2">
                <CustomChip :value="selectedSection?.has_items" />
              </div>
            </div>
          </article>

          <article class="dialog__section">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">
                {{ $t('sections_dialog.has_items_description') }}
              </div>
              <div class="my-2">
              <CustomChip :value="selectedSection?.has_items_description" />
              </div>
            </div>
          </article>

          <article class="dialog__section">
            <div class="text-center">
              <div class="bg-primary-25 rounded-xl py-2">{{ $t('sections_dialog.page_name') }}</div>
              <div class="my-2">{{ selectedSection?.page?.name }}</div>
            </div>
          </article>
        </section>
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
  selectedSection: {
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

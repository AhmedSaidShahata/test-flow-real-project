<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="500"
    class="destroy custom-dialog"
  >
    <v-card class="rounded-xl py-5 px-5">
      <h2 class="font-weight-black text-center my-4">
        {{ $t('media_crud.form_title') }}
      </h2>
      <Form v-if="renderForm" @submit="handleFormSubmit" class="mt-4">
        <v-row>
          <v-col cols="12" md="12" class="pt-0">
            <LocaleSelector name="locale" @changed="() => fetchData(props.slug, props.id)" />
          </v-col>
          <v-col cols="12" md="12" class="pt-0">
            <InputText
              validation="min:3|max:255"
              imageName="media-title-icon.png"
              :form="form"
              name="title"
              :label="$t('media_crud.seo_title')"
              :hint="$t('media_crud.seo_title_hint')"
            />
          </v-col>
          <v-col cols="12" md="12" class="pt-0">
            <InputText
              validation="min:3|max:255"
              imageName="media-alt-icon.png"
              :form="form"
              name="description"
              :label="$t('media_crud.seo_description')"
              :hint="$t('media_crud.seo_description_hint')"
            />
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-4">
          <Button
            class="mx-1 text-primary font-size-17 font-weight-bold bg-transparent"
            type="submit"
            :loading="loadingPost"
          >
            {{ $t('example.save') }}
          </Button>
        </div>
      </Form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { watch } from 'vue'
import { form, submited, loadingPost, renderForm, fetchData, resetForm } from './index.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  id: {
    type: [String, Number],
    required: true
  },
  slug: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'submit'])

// Watch for id changes
watch(
  () => props.id,
  (newId) => {
    if (newId) {
      fetchData(props.slug, newId)
    }
  },
  { immediate: true }
)

// Watch for dialog opening to fetch data
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.id) {
      fetchData(props.slug, props.id)
    }
  }
)

const handleFormSubmit = async () => {
  try {
    await submited(emit, props.slug)
    // Reset form after successful submission
    resetForm()
    // Close dialog
    emit('update:modelValue', false)
  } catch (error) {
    console.error('Error in form submission:', error)
  }
}
</script>

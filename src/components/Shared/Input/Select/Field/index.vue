<template>
  <Field :value="form[name]" :name="name" :rules="validation" v-slot="{ field, errors }">
    <v-select
      ref="selectRef"
      variant="outlined"
      class="locale-selector-input"
      :label="label"
      :no-data-text="$t('no_items')"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      @click="errorsResult = []"
      v-bind="{ ...field, ...$attrs }"
      color="primary"
      :prepend-icon="icon"
      menu-icon="mdi-chevron-down"
      :error-messages="errors.length ? errors : errorsResult && errorsResult[field.name]"
    >
      <template #prepend-inner v-if="imageName">
        <Image width="19px" :name="imageName"></Image>
      </template>

      <template #append-inner>
        <Image name="select-arrow.svg" height="20px" width="20px" />
      </template>
    </v-select>
  </Field>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useErrorsStore } from '@/stores/errors'

const props = defineProps([
  'form',
  'name',
  'label',
  'multiple',
  'validation',
  'icon',
  'itemTitle',
  'itemValue',
  'items',
  'imageName'
])

const { errorsResult, resetErrors } = useErrorsStore()
const selectRef = ref(null)

// === Scroll-to-close logic ===
const closeSelectOnScroll = () => {

  const el = selectRef.value?.$el || null
  if (!el) return

  const rect = el.getBoundingClientRect()
  const inViewport =
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)

  if (!inViewport && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

onMounted(() => {
  window.addEventListener('scroll', closeSelectOnScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', closeSelectOnScroll)
  resetErrors()
})
</script>

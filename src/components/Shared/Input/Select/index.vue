<template>
  <v-select
    ref="selectRef"
    variant="solo"
    autocomplete="off"
    :items="itemsList"
    :item-title="effectiveItemTitle"
    :item-value="effectiveItemValue"
    :no-data-text="$t('no_items')"
    v-model="value"
    :label="label"
    :prepend-icon="icon"
    :multiple="multiple"
    @click="errorsResult = []"
    @keyup="errorsResult[name] = ''"
    v-bind="$attrs"
    color="primary"
    :return-object="false"
    :hint="hint"
    :chips="chips"
    persistent-hint
    class="locale-selector-input"
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
  >
    <template #prepend-inner v-if="imageName">
      <Image width="19px" :name="imageName"></Image>
    </template>

    <template #append-inner>
      <Image name="select-arrow.svg" height="20px" width="20px" />
    </template>
  </v-select>
</template>

<script setup>
import { computed, watch, onUnmounted, onMounted, ref } from 'vue'
import { useErrorsStore } from '@/stores/errors'
import { useField } from 'vee-validate'

const props = defineProps([
  'form',
  'name',
  'chips',
  'label',
  'multiple',
  'validation',
  'icon',
  'itemTitle',
  'itemValue',
  'items',
  'imageName',
  'hint'
])

const { value, errorMessage, resetField } = useField(props.name, props.validation)
const { errorsResult, resetErrors } = useErrorsStore()

const itemsList = computed(() =>
  Array.isArray(props.items) ? props.items : props.items?.value || []
)

const effectiveItemTitle = computed(() => props.itemTitle || 'name')
const effectiveItemValue = computed(() => props.itemValue || 'id')

const selectRef = ref(null)

const closeMenuOnScroll = () => {
  const select = selectRef.value

  if (!select || !select.$el) {
    return
  }

  const rect = select.$el.getBoundingClientRect()
  const inViewport =
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)

  if (!inViewport) {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }

    // Try directly closing menu
    if (select.isMenuActive) {
      select.isMenuActive = false
    }

    if (select.menu?.isActive) {
      select.menu.isActive = false
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', closeMenuOnScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', closeMenuOnScroll)
  resetErrors()
})

// Sync Vue model with form
watch(
  () => value.value,
  (newValue) => {
    if (props.multiple && Array.isArray(newValue)) {
      props.form[props.name] = newValue
    } else if (newValue && typeof newValue === 'object' && newValue.id !== undefined) {
      props.form[props.name] = newValue.id
    } else {
      props.form[props.name] = newValue
    }
  }
)

watch(
  () => props.form[props.name],
  (newValue) => {
    if (newValue !== value.value) {
      value.value = newValue
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.locale-selector-input {
  position: relative;
}
</style>

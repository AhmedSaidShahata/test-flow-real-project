<template>
  <v-autocomplete
    variant="solo"
    :no-data-text="$t('no_items')"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    @click="errorsResult = []"
    :prepend-icon="icon"
    :menu-icon="false"
    v-model="value"
    @keyup="errorsResult[name] = ''"
    v-bind="$attrs"
    color="primary"
    persistent-hint
    :label="label"
    ref="selectRef"
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
    class="locale-selector-input"
    >
  <template v-slot:prepend-inner>
    <div class="ms-1 me-1 mt-2">

      <Image :name="imageName" height="20px" width="20px"/>
    </div>
    </template>
  <template v-slot:append-inner>
    <div class="ms-1 me-1 mt-2 cursor-pointer">

      <Image name="select-arrow.svg" height="20px" width="20px"/>
    </div>
    </template>
  </v-autocomplete>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { computed, watch, onUnmounted, onMounted, ref } from 'vue'
const props = defineProps([
  "form",
  "name",
  "label",
  "multiple",
  "validation",
  "icon",
  "itemTitle",
  "itemValue",
  "items",
  "imageName",
  "nullable",
]);
const { value, errorMessage, resetField } = useField(props.name, props.validation);

const { errorsResult,resetErrors } = useErrorsStore();

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

watch(
  () => value.value,
  (newValue) => {
    if (newValue) {
      props.form[props.name] = newValue;
    }
  }
);

watch(
  () => props.form[props.name],
  (newValue) => {
   if (props.nullable) {
      resetField({
        value: newValue,
      });
    } else if (newValue) {
      resetField({
        value: props.form[props.name],
      });
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener('scroll', closeMenuOnScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', closeMenuOnScroll)
  resetErrors()
})
</script>

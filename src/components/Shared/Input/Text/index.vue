<template>
  <v-text-field
  autocomplete="off"
    variant="solo"
    :type="type"
    v-model="value"
    @keyup="errorsResult[name] = ''"
    v-bind="$attrs"
    :prepend-icon="icon"
    color="primary"
    :label="label"
    persistent-hint
    :hint="hint"
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
  >
    <template #prepend-inner v-if="imageName">
      <Image width="19px" :name="imageName" :class="customIconClass"></Image>
    </template>
  </v-text-field>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, onUnmounted } from "vue";
const props = defineProps(["form", "type", "name", "label","imageName", "validation", "icon", "hint", "customIconClass"]);
const { value, errorMessage, resetField } = useField(props.name, props.validation);
const { errorsResult, resetErrors } = useErrorsStore();

watch(
  () => value.value,
  (newValue) => {
      props.form[props.name] = newValue;
  }
);

watch(
  () => props.form[props.name],
  (newValue) => {
    resetField({
      value: newValue !== undefined ? newValue : "",
    });
  },
  { immediate: true }
);


onUnmounted(() => {
  resetErrors();
});
</script>

<template>
  <v-textarea
    variant="solo"
    :type="type"
    v-model="value"
    @keyup="errorsResult[name] = ''"
    class="textarea"
    v-bind="$attrs"
    :prepend-icon="icon"
    color="primary"
    :label="label"
    rows="4"
    no-resize
    persistent-hint
    :hint="hint"
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
  >
    <template #prepend-inner v-if="imageName">
      <Image width="19px" :name="imageName"></Image>
    </template>
  </v-textarea>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, onUnmounted } from "vue";
const props = defineProps(["form", "type", "name", "label","imageName", "validation", "icon", "hint"]);
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
    if (newValue) {
      resetField({
        value: props.form[props.name],
      });
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  resetErrors();
});
</script>

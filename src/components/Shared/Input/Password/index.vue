<template>
  <v-text-field
    @click:append-inner="show = !show"
     variant="solo"
    :label="label"
    :hint="hint"
    persistent-hint
    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
    :type="show ? 'text' : 'password'"
    :prepend-icon="icon"
    color="primary"
    v-model="value"
    @keyup="errorsResult[name] = ''"
    v-bind="$attrs"
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
  >
    <template #prepend-inner v-if="imageName">
      <Image  width="19px" :name="imageName"></Image>
    </template>
  </v-text-field>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, ref, onUnmounted } from "vue";
const props = defineProps(["form", "type", "name", "label","imageName", "validation", "icon", "hint"]);
const { value, errorMessage, resetField } = useField(props.name, props.validation);

const { errorsResult, resetErrors } = useErrorsStore();
const show = ref(false);
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

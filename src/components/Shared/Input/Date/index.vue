<template>
  <div>
    <v-date-input
      v-model="value"
      :prepend-icon="icon"
      color="primary"
      :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
    />
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { watch, onUnmounted } from "vue";
import { useErrorsStore } from "@/stores/errors";
const props = defineProps(["form", "name", "validation", "icon"]);
const { value, errorMessage } = useField(props.name, props.validation);

const { errorsResult, resetErrors } = useErrorsStore();

watch(
  () => value.value,
  (newValue) => {
    if (newValue) {
      const dateFormat = newValue.toLocaleDateString("en", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      props.form[props.name] = dateFormat;
      value.value = newValue;
    }
  }
);

onUnmounted(() => {
  resetErrors();
});
</script>

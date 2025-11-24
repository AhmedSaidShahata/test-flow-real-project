<template>
  <v-text-field
    v-model="value"
    :active="showTime"
    :focus="showTime"
    :label="label"
    prepend-icon="mdi-clock-time-four-outline"
    readonly
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
  >
    <v-menu
      v-model="showTime"
      :close-on-content-click="false"
      activator="parent"
      transition="scale-transition"
    >
      <v-time-picker
        position="fixed"
        color="primary"
        min-height="470px"
        max-width="500px"
        ampm-in-title
        v-if="showTime"
        v-model="value"
      ></v-time-picker>
    </v-menu>
  </v-text-field>
</template>

<script setup>
import { useField } from "vee-validate";
import { ref, watch, onUnmounted } from "vue";

import { useErrorsStore } from "@/stores/errors";
const { errorsResult, resetErrors } = useErrorsStore();

const showTime = ref(false);

const props = defineProps(["form", "name", "validation", "icon", "label"]);
const { value, errorMessage } = useField(props.name, props.validation);

watch(
  () => value.value,
  (newValue) => {
    if (newValue) {
      props.form[props.name] = newValue;
      value.value = newValue;
    }
  }
);

onUnmounted(() => {
  resetErrors();
});
</script>

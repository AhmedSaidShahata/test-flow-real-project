<template>
  <Field :value="form[name]" :name="name" :rules="validation" v-slot="{ field, errors }">
    <v-textarea
      @keyup="errorsResult = []"
      :prepend-icon="icon"
      :label="$t(name)"
      v-model="form[name]"
      v-bind="{ ...field, ...$attrs }"
      :error-messages="
        errors.length ? errors : errorsResult && errorsResult[field.name]
      "
    ></v-textarea>
  </Field>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
const { errorsResult } = useErrorsStore();
const props = defineProps(["form", "name", "label", "validation", "icon"]);
</script>

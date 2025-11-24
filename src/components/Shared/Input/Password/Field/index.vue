<template>
  <Field :value="form[name]" :name="name" :rules="validation" v-slot="{ field, errors }">
    <label v-if="label" class="my-1 d-inline-block font-size-14 font-weight-bold">
      {{ label }}
      <span class="text-error" v-if="validation?.includes('required')"> * </span>
    </label>
    <v-text-field
      @click:append-inner="show = !show"
      :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      @keyup="errorsResult = []"
      v-bind="{ ...field, ...$attrs }"
      :prepend-icon="icon"
      v-model="form[name]"
      variant="outlined"
      color="primary"
      :error-messages="errors.length ? errors : errorsResult && errorsResult[field.name]"
    >
    </v-text-field>
  </Field>
</template>

<script setup>
import { ref } from "vue";
import { useErrorsStore } from "@/stores/errors";
const { errorsResult } = useErrorsStore();
const props = defineProps(["form", "name", "label", "validation", "icon"]);

const show = ref(false);
</script>

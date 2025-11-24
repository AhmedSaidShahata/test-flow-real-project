<template>
  <Field :value="form[name]" :name="name" :rules="validation" v-slot="{ field, errors }">
    <v-label
      v-if="label"
      class="my-1 d-inline-block font-size-14 font-weight-bold text-black"
    >
      {{ label }}
    </v-label>
    <v-text-field
      variant="outlined"
      @keyup="errorsResult = []"
      :type="type"
      v-bind="{ ...field, ...$attrs }"
      :prepend-icon="icon"
      color="primary"
      :error-messages="errors.length ? errors : errorsResult && errorsResult[field.name]"
    >
      <template v-slot:prepend-inner>
        <slot name="Prepend-inner-icon"></slot>
      </template>
    </v-text-field>
  </Field>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";

const props = defineProps(["form", "type", "name", "label", "validation", "icon"]);
const { errorsResult } = useErrorsStore();
</script>

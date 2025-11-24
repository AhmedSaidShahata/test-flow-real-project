<template>
  <div class="input-file text-center position-relative cursor-pointer">
    <v-file-input
      class="input-file__upload w-100 h-100 opacity-0 position-absolute"
      :multiple="multiple"
      v-bind="$attrs"
      :error-messages="errorMessage"
      variant="outlined"
      v-model="value"
      :loading="loading"
    />

    <div class="d-flex justify-center pt-2 pb-1">
      <p v-if="loading" class="text-grey font-weight-bold">{{ $t('file-loading') }} </p>
      <p v-else class="text-primary font-weight-bold">{{ $t('upload-image') }} </p>
      <div>
        <Image class="mt-1 ms-2" width="20px" name="image-add.svg" />
      </div>
    </div>
  </div>

  <p class="mt-3 font-weight-bold"
  :class="$vuetify.display.mdAndUp ? 'font-size-14' : 'font-size-11'">
    {{ hint ?? $t("image-hint") }}
  </p>

  <p class="text-danger" v-if="errorMessage">
    {{ errorMessage }}
  </p>
  <p class="text-danger" v-if="errorsResult && errorsResult[name]">
    {{ errorsResult[name][0] }}
  </p>
</template>

<script setup>
import { useField } from "vee-validate";
import { ref, watch } from "vue";

const emit = defineEmits(["fileSelected","changed"]);

const props = defineProps(["form", "name", "validation", "hint", "icon", "multiple", "loading"]);
const { value, errorMessage, validate , meta} = useField(props.name, props.validation);



watch(
  () => value.value,
  async (newValue) => {
    if (newValue) {
      const { valid } = await validate();
      if (!valid) return;

      if (props.multiple) {
        for (let i = 0; i < newValue.length; i++) {
          let file = newValue[i];
          props.form[props.name].push(file);
          emit("fileSelected", file);
        }
        emit("changed")
    
      } else {
        let file = newValue;
        props.form[props.name] = file;
        emit("fileSelected", file);
      }
    }
  }
);

defineExpose({ valid: meta.valid , validate});
</script>

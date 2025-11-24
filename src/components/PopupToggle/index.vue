<template>
  <div>
    <v-switch
      inset
      class="switch-toggle"
      :model-value="localValue"
      :loading="loadingPut"
      @click="handleClick"
      style="height: 60px;"
    />

    <v-dialog v-model="dialog" max-width="500" class="destroy custom-dialog" @after-leave="resetTempValue">
      <v-card class="rounded-xl py-5">
        <v-card-title class="text-center text-wrap font-weight-black mb-0">
          <div>
            <Image width="35px" class="mb-4" :name="icon" />
          </div>
          {{ $t(title) }}
        </v-card-title>
        <v-card-text class="text-center mt-n3">
          {{ $t(description) }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end w-100 me-7">
            <Button
              class="mx-1 text-primary font-size-17 font-weight-bold bg-transparent"
              :loading="loadingPut"
              color="error"
              @click="confirmChange"
            >
              {{ $t('example.confirm') }}
            </Button>
            <Button
              class="mx-1 text-error font-size-17 font-weight-bold bg-transparent"
              @click="closeDialog"
            >
              {{ $t('example.cancel') }}
            </Button>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch} from 'vue';
import useApi from "@/composables/useApi";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: Boolean,
  url: String,
  id: [String, Number],
  name: String,
  icon: {
    type: [String, Boolean],
    default: 'delete_trash.svg'
  },
  title: {
    type: String,
    default: 'example.delete_tourism_package'
  },
  description: {
    type: String,
    default: 'example.delete_tourism_package_description'
  }
});

const { put, loadingPut } = useApi();
const localValue = ref(props.modelValue);
const dialog = ref(false);
const tempNewValue = ref(null);

watch(() => props.modelValue, (val) => {
  localValue.value = val;
});

const handleClick = (event) => {
  event.preventDefault();
  tempNewValue.value = !localValue.value;
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const resetTempValue = () => {
  tempNewValue.value = null;
};

const confirmChange = async () => {
  const response = await put(`/${props.url}/${props.id}`, {
    [props.name]: tempNewValue.value,
    locale: localStorage.getItem("lang"),
  });
  
  if (response.status === 200) {
    localValue.value = tempNewValue.value;
    emit('update:modelValue', tempNewValue.value);
  }
  closeDialog();
};
</script>
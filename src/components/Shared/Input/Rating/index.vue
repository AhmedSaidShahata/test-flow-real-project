<template>
  <div v-bind="{ name, validation }">
    <div class="d-flex flex-row rounded-xl bg-primary-25 px-2 py-1">
      <p class="mt-1">{{ label }}</p>
      <v-spacer />
      <v-rating
        :model-value="value"
        @update:modelValue="onUserInteraction"
        :length="5"
        class="mt-1"
      >
        <template #item="{ isFilled }">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mx-1"
          >
            <path
              d="M12 2C12.41 2 12.8 2.24 13 2.62L15.3 7.3L20.5 8.03C21.06 8.11 21.41 8.73 21.12 9.22L17.5 15.17L18.4 21.24C18.49 21.84 17.86 22.29 17.32 22.02L12 19.28L6.68 22.02C6.14 22.29 5.51 21.84 5.6 21.24L6.5 15.17L2.88 9.22C2.59 8.73 2.94 8.11 3.5 8.03L8.7 7.3L11 2.62C11.2 2.24 11.59 2 12 2Z"
              :fill="isFilled ? '#FF754C' : '#ddd'"
              :stroke="isFilled ? '#FF754C' : '#ddd'"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </v-rating>
    </div>

    <p v-if="errorMessage" class="text-error font-size-12 mt-1 ms-2">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';
import { watch, ref, onMounted } from 'vue';

const props = defineProps({
  form: Object,
  name: String,
  validation: String,
  label: String,
});

// Track if user interacted manually
const isTouchedManually = ref(false);

const { value, errorMessage, resetField } = useField(
  props.name,
  props.validation,
  {
    transform: (val) => (val === null || val === 0 ? undefined : val),
    validateOnMount: false, // Don't show validation immediately
  }
);

// Update form on value change
watch(
  () => value.value,
  (val) => {
    props.form[props.name] = val;

    // Only validate when user has interacted
    if (isTouchedManually.value) {
      // Trigger validation manually
      resetField({ value: val, touched: true, dirty: true });
    }
  }
);

// When form has initial value, restore it
watch(
  () => props.form[props.name],
  (val) => {
    if (val !== undefined) {
      resetField({ value: val });
    }
  },
  { immediate: true }
);

// Mark as touched only when user actually clicks rating
function onUserInteraction(val) {
  isTouchedManually.value = true;
  value.value = val;
}
</script>

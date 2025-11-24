<template>
  <div class="d-flex flex-column gap-2">
    <v-radio-group
      :model-value="modelValue"
      @update:modelValue="updateSelection"
      hide-details
      class="mt-0"
    >
      <div v-for="item in props.items" :key="item.value" class="d-flex align-items-center">
        <v-radio
          :value="`${props.filterKey}_${item.value}`"
          :color="modelValue === `${props.filterKey}_${item.value}` ? 'primary' : 'grey'"
          :id="`${props.filterKey}_${item.value}`"
        />
        <v-label :for="`${props.filterKey}_${item.value}`"
            class="text-center font-size-14 py-1 filter__checkbox__label w-100 me-7 mb-2 cursor-pointer d-flex justify-center"
            :class="
              modelValue === `${props.filterKey}_${item.value}`
                ? 'bg-primary text-white'
                : 'bg-primary-50 text-primary'
            "
          >
            {{ $t(item.title) }}
        </v-label>
      </div>
    </v-radio-group>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: [String, Number, Boolean, Object, null],
  filterKey: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

function updateSelection(value) {
  emit('update:modelValue', value === props.modelValue ? null : value);
}
</script>

<style scoped>
:deep(.v-radio-group .v-input__control::after) {
  display: none !important;
}
</style>
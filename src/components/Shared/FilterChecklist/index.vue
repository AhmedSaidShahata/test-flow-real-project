<template>
  <v-list class="mt-2 rounded-lg">
    <v-list-subheader
      class="text-center font-weight-black font-size-16 font-din text-black"
    >
      {{ title }}
    </v-list-subheader>
    <v-list-item v-for="item in items" :key="item.id" @click.stop>
      <template v-slot:prepend>
        <v-checkbox
          :model-value="modelValue"
          :value="item.id"
          density="compact"
          hide-details
          @click.stop
          @update:model-value="updateSelection"
          :color="modelValue.includes(item.id) ? 'primary' : 'grey'"
          class="me-1"
        ></v-checkbox>
      </template>

      <v-list-item-title
        class="text-center font-size-14 py-1 filter__checkbox__label"
        :class="
          modelValue.includes(item.id)
            ? 'bg-primary text-white'
            : 'bg-primary-50 text-primary'
        "
        @click.stop="toggleCheckbox(item.id)"
        style="cursor: pointer"
      >
        {{ item.label }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import emitter from '@/plugins/emitter/index'

// Props
const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every((item) => typeof item === 'object' && 'id' in item && 'label' in item)
    }
  },
  title: {
    type: String,
    default: 'Filter By'
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

// Function to update selection
const updateSelection = (newValue) => {
  emitter.emit('filterChecklist:update', newValue)
}

// Function to toggle checkbox when label is clicked
const toggleCheckbox = (value) => {
  const currentSelection = [...props.modelValue]
  const index = currentSelection.indexOf(value)
  
  if (index > -1) {
    currentSelection.splice(index, 1)
  } else {
    currentSelection.push(value)
  }
  
  emitter.emit('filterChecklist:update', currentSelection)
}

// Expose methods for parent component
defineExpose({
  clearSelection: () => {
    emitter.emit('filterChecklist:update', [])
  },
  getSelectedItems: () => {
    return props.items.filter(item => props.modelValue.includes(item.id))
  }
})
</script>
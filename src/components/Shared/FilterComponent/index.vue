<template>
  <section class="d-flex justify-end align-center ga-2 ms-auto mt-6">
    <!-- filter dropdown -->
    <div class="text-center">
      <Button
        gradient="true"
        radius="14px"
        height="45"
        :width="$vuetify.display.mdAndUp ? 100 : 48"
        class="d-flex justify-center align-center"
      >
        <span class="d-none d-md-inline ms-3 me-1 font-size-12">{{ $t('filter') }}</span>
        <Image class="me-md-4" name="filter.svg" />
        <v-menu activator="parent" :close-on-content-click="false">
          <FilterChecklist
            ref="checklistRef"
            :items="filterItems"
            :title="$t('filter_by')"
            v-model="selectedItems"
          />
        </v-menu>
      </Button>
    </div>

    <!-- clear button -->
    <OutlinedButton
      color="primary"
      radius="14px"
      class="p-2 d-flex justify-center align-center"
      height="45"
      :width="$vuetify.display.mdAndUp ? 100 : 48"
      @click.stop="clearFilters"
    >
      <span class="d-none d-md-inline font-weight-black font-size-12"> {{ $t('clear') }}</span>
      <v-icon class="d-inline d-md-none" size="20">mdi-close-circle-outline</v-icon>
    </OutlinedButton>

    <!-- search button -->
    <Button
      color="primary"
      radius="14px"
      class="p-2 d-flex justify-center align-center"
      height="45"
      :width="$vuetify.display.mdAndUp ? 100 : 48"
      @click="handleSearch"
    >
      <span class="font-weight-bold d-none d-md-inline font-size-12"> {{ $t('search') }} </span>
      <v-icon class="d-inline d-md-none" size="20">mdi-magnify</v-icon>
    </Button>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emitter from '@/plugins/emitter/index'

// Props
const props = defineProps({
  filterItems: {
    type: Array,
    default: () => [
      { id: 1, label: 'تفعيل مستخدم مفعل' },
      { id: 2, label: 'خيار ثاني' },
      { id: 3, label: 'خيار ثالث' },
      { id: 4, label: 'خيار رابع' },
      { id: 5, label: 'خيار خامس' }
    ],
    validator: (items) => {
      return items.every((item) => typeof item === 'object' && 'id' in item && 'label' in item)
    }
  }
})

// Reactive data
const selectedItems = ref([])
const checklistRef = ref(null)

// Listen for filterChecklist updates
emitter.on('filterChecklist:update', (newValue) => {
  selectedItems.value = newValue
})

// Clear all selected filters
const clearFilters = () => {
  selectedItems.value = []
  emitter.emit('filter:clear')
}

// Handle search action
const handleSearch = () => {
  const selectedData = selectedItems.value
    .map((id) => {
      return props.filterItems.find((item) => item.id === id)
    })
    .filter(Boolean) // Remove any undefined items


  emitter.emit('filter:search', {
    selectedIds: [...selectedItems.value],
    selectedItems: selectedData
  })
}
</script>
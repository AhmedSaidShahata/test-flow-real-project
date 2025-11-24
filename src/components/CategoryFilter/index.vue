<template>
    <Button
      radius="15px"
      height="43"
      min-width="60px"
      class="d-flex justify-center align-center button--custom px-3 w-auto px-md-3"
    >
    
    <span class=" d-none d-md-inline me-4  font-size-12 button__text--custom ">{{ $t('blog_category') }}</span>
    <Image class="ms-md-8" width="20" name="gradient-arrow-circle-down.svg" />
    
      <v-menu activator="parent">
        <v-list class="rounded-lg" style="min-width: 230px">
          <v-list-subheader class="text-center font-weight-bold font-size-16 font-din text-black">
            {{ $t('filter_by') }}
          </v-list-subheader>
          
          <v-list-item 
            :value="''" 
            @click="selectCategory('')"
            :class="{ 'v-list-item--active': modelValue === '' }"
            class="font-weight-bold"
          >
            <v-list-item-title>{{ $t('all_categories') || 'All Categories' }}</v-list-item-title>
          </v-list-item>
          
          <v-list-item 
            v-for="(item, index) in items" 
            :key="index" 
            :value="item.id"
            @click="selectCategory(item.id)"
            :class="{ 'v-list-item--active': modelValue == item.id }"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </Button>
</template>

<script setup>
import {  computed } from 'vue'

const props = defineProps({ 
  items: { type: Array, default: [] },
  modelValue: { type: [String, Number], default: '' }
})

const emit = defineEmits(['update:modelValue'])

const selectCategory = (categoryId) => {
  emit('update:modelValue', categoryId)
}

const selectedCategoryLabel = computed(() => {
  if (!props.modelValue) return props.$t?.('all_categories') || 'All Categories'
  const selected = props.items.find(item => item.id == props.modelValue)
  return selected?.label || 'All Categories'
})


</script>
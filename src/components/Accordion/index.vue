<template>
  <v-expansion-panels flat color="#B99DFB" bg-color="#F7F3FF">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <template v-slot:actions="{ expanded }">
            <Image :name="expanded ? 'menu-up.svg' : 'menu-down.svg'"></Image>
        </template>
        <div class="d-flex flex-column text-white">
          <p class="font-weight-bold font-size-16">{{ title }}</p>
          <span class="text-white font-size-14 pt-2">{{ description }}</span>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
          <slot />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

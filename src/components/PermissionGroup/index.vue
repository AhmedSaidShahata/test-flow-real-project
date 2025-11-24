<template>
  <v-card outlined flat class="px-3 bg-primary-25" style="border-radius: 12px;">
    <div>
      <h3>
        {{ groupPermssionName }}
      </h3>
      <v-card-text class="pa-0 mt-4 d-flex flex-column gap-10">
        <slot name="permission_body"></slot>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup>

const props = defineProps({
  groupPermssionName: {
    type: String,
    default: '',
  },
})
</script>

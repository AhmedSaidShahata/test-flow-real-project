<template>
  <v-dialog
    class="generic-dialog custom-dialog"
    :persistent="persistent"
    :max-width="maxWidth"
    :value="props.dialog"
    @input="$emit('update:dialog')"
    @click:outside="$emit('close-dialog')"
  >
    <v-card class="py-1 card__linear-bg rounded-xl">
      <v-card-title class="text-center font-weight-bold" v-if="title">
        {{ $t(title) }}
      </v-card-title>
      <v-card-text>
        <p v-if="message">
          {{ $t(message) }}
        </p>
        <div>
          <slot />
        
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps([
  "dialog",
  "title",
  "message",
  "icon",
  "persistent",
  "maxWidth",
]);
</script>

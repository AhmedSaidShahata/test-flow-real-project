<template>
  <section>
    <LoaderProgress v-if="loading" />
    <div>
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps(["loading"]);
</script>

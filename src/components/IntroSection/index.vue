<template>
  <section class="intro-section position-relative">
    <div class="intro-section__bg position-absolute" />
    <div class="intro-section__container position-relative bg-white">
      <h2 class="mb-2 font-size-22">
        {{ $t(title) }}
      </h2>
      <p class="intro-section__container__description font-size-14">
        {{ $t(description) }} 
      </p>
    </div>
  </section>
</template>
<script setup>
defineProps(["title", "description"]);
</script>

<template>
  <section class="heading-page position-relative w-100">
    <div class="heading-page__bg position-absolute" />
    <div class="heading-page__container position-relative w-100  px-5 d-flex align-center flex-wrap py-2">
      <div class="me-4 d-flex justify-center align-center">
        <Image :name="icon" />
      </div>
      <div>
        <h2 class="font-size-22 font-weight-bolder">{{ $t(title) }}</h2>
        <span>{{ $t(description) }}</span>
      </div>
      <div class="ms-auto heading-page__slot">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "users",
  },
  icon: {
    type: String,
    default: "heading-users.svg",
  },
  description: {
    type: String,
    default: "يمكنك الاطلاع علي كافه المستخدمين في الموقع",
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <section class="ms-lg-n6">
    <div class="rounded-xl mt-1">
      <FormAction />
    </div>
  </section>
</template>
<script setup>
import FormAction from "@/components/FormActions/Reviews/index.vue";
import { useIsEdit } from "@/composables/useIsEdit";
const { isEdit } = useIsEdit();
</script>

<template>
  <section class="ms-lg-n6">
    <div class="rounded-xl bg-white py-4 mt-1">
      <div class="px-5 pt-1">
        <HeadingPage
          v-if="isEdit"
          icon="keywords-image.svg"
          title="keywords_crud.heading_edit.title"
          description="keywords_crud.heading_edit.description"
          class="mb-14"
        />

        <HeadingPage
          v-else
          icon="keywords-image.svg"
          title="keywords_crud.heading_create.title"
          description="keywords_crud.heading_create.description"
          class="mb-14"
        />
      </div>
      <FormAction />
    </div>
  </section>
</template>
<script setup>
import FormAction from "@/components/FormActions/Keywords/index.vue";
import { useIsEdit } from "@/composables/useIsEdit";
const { isEdit } = useIsEdit();
</script>

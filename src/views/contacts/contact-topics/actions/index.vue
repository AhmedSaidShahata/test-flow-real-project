<template>
  <section class="ms-lg-n6">
    <div class="rounded-xl bg-white py-4 mt-1">
      <div class="px-5 pt-1">
        <HeadingPage
          v-if="isEdit"
          icon="topics_heading.svg"
          title="topics_crud.heading_edit.title"
          description="topics_crud.heading_edit.description"
          class="mb-14"
        />

        <HeadingPage
          v-else
          icon="topics_heading.svg"
          title="topics_crud.heading_create.title"
          description="topics_crud.heading_create.description"
          class="mb-14"
        />
      </div>
      <FormAction />
    </div>
  </section>
</template>
<script setup>
import FormAction from "@/components/FormActions/Topics/index.vue";
import { useIsEdit } from "@/composables/useIsEdit";
const { isEdit } = useIsEdit();
</script>

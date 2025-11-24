<template>
  <section class="ms-lg-n6">
    <div class="rounded-xl bg-white py-4 mt-1">
      <div class="px-5 pt-1">
        <HeadingPage
          v-if="isEdit"
          icon="blogs_heading.svg"
          title="blog-categories_crud.heading_edit.title"
          description="blog-categories_crud.heading_edit.description"
          class="mb-14"
        />

        <HeadingPage
          v-else
          icon="blogs_heading.svg"
          title="blog-categories_crud.heading_create.title"
          description="blog-categories_crud.heading_create.description"
          class="mb-14"
        />
      </div>
      <FormAction />
    </div>
  </section>
</template>
<script setup>
import FormAction from "@/components/FormActions/Blogs/Categories/index.vue";
import { useIsEdit } from "@/composables/useIsEdit";
const { isEdit } = useIsEdit();
</script>

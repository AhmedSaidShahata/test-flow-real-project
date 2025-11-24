<template>
  <main class="position-relative bg-white ms-0 ms-lg-n6 rounded-xl pb-5">
    <div class="d-flex justify-space-between pa-5 align-center flex-wrap">
      <HeadingPage
        icon="clipboard-dark.png"
        title="pages-keywords_crud.actions.title"
        description="pages-keywords_crud.actions.description"
      >
      </HeadingPage>
    </div>
    <FormAction/>
  </main>
</template>

<script setup>
import FormAction from "@/components/FormActions/PageKeywords/index.vue"
</script>

<template>
  <section class="ms-lg-n5">
    <div class="rounded-xl bg-white py-4 mt-2">
      <div class="px-4">
        <HeadingPage
          title="sections_crud.edit_heading"
          icon="heading-pages.svg"
          description="sections_crud.edit_description"
          class="mb-4"
        />
      </div>
      <FormAction />
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import FormAction from "@/components/FormActions/PageSections/index.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute();


const path = computed(() => route.params.path);
</script>
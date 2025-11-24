<template>
  <section class="ms-lg-n5">
    <div class="rounded-xl bg-white py-4 mt-2">
      <div class="px-4">
        <HeadingPage
          :title="`${$t('edit')} ${title}`"
          icon="heading-pages.svg"
          :description="`${$t('pages_crud.edit_data_desc')} ${title}`"
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
import useApi from "@/composables/useApi";
import FormAction from "@/components/FormActions/Pages/index.vue";

const route = useRoute();
const { get } = useApi();

const title = ref("");
const url = "pages"; // Define the URL endpoint

const path = computed(() => route.params.path);

const fetchTitle = async () => {
  try {
    const response = await get(`/${url}/${path.value}`);
    title.value = response?.data?.page?.name || "";
    console.log(title.value);
  } catch (error) {
    console.error('Error fetching page title:', error);
    title.value = "";
  }
};

onMounted(() => {
  fetchTitle();
});
</script>
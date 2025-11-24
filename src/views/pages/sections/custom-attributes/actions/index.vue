<template>
  <section class="ms-lg-n5">
    <div class="rounded-xl bg-white py-4 mt-2">
      <div class="px-4">
        <HeadingPage
          title="items_custom_attr.edit_heading"
          icon="heading-pages.svg"
          description="items_custom_attr.edit_description"
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
import FormAction from "@/components/FormActions/SecCustAttr/index.vue";

const route = useRoute();


const path = computed(() => route.params.path);
const identifier = computed(() => route.params.identifier);


</script>
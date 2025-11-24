<template>
  <section class="position-relative mx-lg-n5">
    <div style="min-height: 85vh">
      <h2 class="pt-4">
        {{ $t("example.home") }}
      </h2>

      <v-col cols="12" md="12"> </v-col>

      <v-card class="pa-6">
        <Form>
          <InputFile
            multiple="true"
            @fileSelected="previewFile"
            validation="required|size:1024|mimes:image/jpeg,image/png|length:3"
            :form="form"
            name="file"
            :label="$t('file')"
          />

          <img v-if="preview" width="100px" height="100px" :src="preview" />

          <Button color="primary" class="mt-4" type="submit"> Submit </Button>
        </Form>
      </v-card>
      <div class="me-6">
        <Breadcrumbs>
          <Button
            v-if="$hasPermission('contact-topics_create')"
            class="font-weight-bold text-center ps-12"
            radius="15px"
            min-height="40px"
            min-width="130px"
            color="primary"
            :to="`/${url}/create`"
            icon="plus.svg"
          >
            {{ $t("create") }}
          </Button>
        </Breadcrumbs>
      </div>
      <LocaleSelector width="300px" />
      <CustomChip :value="true" />
      <CustomChip :value="false" />
      <FilterComponent :filter-items="userFilterOptions" />
      <CardWrapper class="mt-4 me-7 mb-4">
        <div class="px-10 py-10"></div>
        <IntroSection
          title="البيانات الاساسية"
          description="يمكنك تحميل الصورة الرمزية الخاصة بالمستخدم هنا أو تغييرها"
        />
        <div class="px-10 py-10"></div>
      </CardWrapper>
      <Accordion
        title="دعوة الشركة"
        description="يمكنك التحكم وإدارة البيانات المتعلقة بدعوة الشركة"
      >
        <v-card flat>
          <div class="pa-5">hello</div>
        </v-card>
      </Accordion>
    </div>

    <ReleaseVersion />
  </section>
</template>

<script setup>
const preview = ref("");

const form = ref({
  name: "",
  file: [],
});

const previewFile = (file) => {
  preview.value = URL.createObjectURL(file);
};

import { ref, onMounted, onUnmounted } from "vue";
import Accordion from "@/components/Accordion/index.vue";

//?need to create the handlers when using the filter ro implement the filtering logic upon the recieved array of objects
import emitter from "@/plugins/emitter/index";
// filter options
const userFilterOptions = ref([
  { id: 1, label: "تفعيل مستخدم نشط" },
  { id: 2, label: "مستخدم معطل" },
  { id: 3, label: "مستخدم جديد" },
  { id: 4, label: "مستخدم محظور" },
]);

// Setup event listeners
onMounted(() => {
  // Listen to filter events
  // emitter.on('filter:search', handleFilterSearch)
  // emitter.on('filter:clear', handleFilterClear)
});

// Cleanup event listeners
onUnmounted(() => {
  // Remove event listeners to prevent memory leaks
  // emitter.off('filter:search', handleFilterSearch)
  // emitter.off('filter:clear', handleFilterClear)
});
</script>

<template>
  <Form v-if="renderForm" @submit="submited($router)" class="mt-4">
    <v-row style="min-height: 47vh">
      <v-col cols="12" md="4">
        <IntroSection
          v-if="isEdit"
          title="blog-categories_crud.intro_edit.title"
          description="blog-categories_crud.intro_edit.description"
        />
        <IntroSection
          v-else
          title="blog-categories_crud.intro_create.title"
          description="blog-categories_crud.intro_create.description"
        />
      </v-col>

      <v-col cols="12" md="8">
        <v-row class="px-5">
          <v-col v-if="isEdit" class="px-0" cols="12" md="12">
            <v-col cols="12" md="6">
              <LocaleSelector name="locale" @changed="handleShow($route)" />
            </v-col> </v-col
          >
          <v-col cols="12" md="6">
            <InputText
              :hint="$t('blog-categories_crud.input.slug_hint')"
              imageName="category-input-slug.svg"
              validation="required|alpha_dash|min:3|max:50"
              :form="form"
              name="slug"
              :label="$t('slug')"
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              :hint="$t('blog-categories_crud.input.name_hint')"
              imageName="category-input-name.svg"
              validation="required|min:3|max:100"
              :form="form"
              name="name"
              :label="$t('name')"
            />
          </v-col>
          <v-col cols="12" md="6">
            <LabelToggle :form="form" name="visible" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-4">
      <div class="px-5">
        <Button
          class="font-weight-bold text-center ps-12"
          radius="15px"
          min-height="40px"
          min-width="130px"
          color="primary"
          icon="plus.svg"
          type="submit"
          :loading="loadingPost"
        >
          {{ $t("example.save") }}
        </Button>
      </div>
    </div>
  </Form>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import {
  form,
  submited,
  loadingPost,
  renderForm,
  handleShow,
  resetForm,
  url,
} from "./index.js";
import { useRoute } from "vue-router";
import { useIsEdit } from "@/composables/useIsEdit";

let route = useRoute();
const { isEdit } = useIsEdit();

onMounted(() => {
  handleShow(route);
});

onUnmounted(() => {
  resetForm();
});
</script>

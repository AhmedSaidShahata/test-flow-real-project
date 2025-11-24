<template>
  <Form v-if="renderForm" @submit="submited($router)" class="mt-4">
    <v-row>
      <v-col cols="12" md="12" v-if="isEdit">
        <LocaleSelector name="locale" @changed="handleShow($route)" />
      </v-col>
      <!-- <v-col cols="12" md="12">
        <InputText validation="required" :form="form" name="name" :label="$t('name')" />
      </v-col> -->
      <!-- <v-col cols="12" md="12">
        <InputTextArea validation="required" :form="form" name="description" :label="$t('description')" />
      </v-col> -->
      <v-col cols="12" md="12">
        <InputEditor validation="required" :form="form" name="name" :label="$t('name')" />
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-4">
      <Button class="font-weight-bold" type="submit" :loading="loadingPost">
        {{ $t("example.save") }}
      </Button>
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

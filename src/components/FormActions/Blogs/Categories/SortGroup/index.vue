<template>
  <div class="w-100 px-10">
    <div
      class="d-flex sort-data justify-space-between align-center mb-2"
      v-for="(group, index) in form.groups"
      :key="group.id"
    >
      <p>{{ group.name }}</p>
      <div class="d-flex sort-data__btns">
        <v-btn
          variant="text"
          @click="moveItemUp(index)"
          :disabled="index === 0"
          text
          style="width: 30px !important; min-width: 30px !important"
        >
          <Image width="13px" name="category-arrow-up.svg"></Image>
        </v-btn>
        <v-btn
          variant="text"
          @click="moveItemDown(index)"
          :disabled="index === form.groups.length - 1"
          text
          style="width: 30px !important; min-width: 30px !important"
        >
          <Image width="13px" name="category-arrow-down.svg"></Image>
        </v-btn>
      </div>
    </div>

    <div class="d-flex justify-end mt-1 mx-n9">
      <v-btn
        :loading="loadingPost"
        color="primary"
        variant="text"
        class="mx-1 font-weight-bold"
        @click="saved"
      >
        {{ $t("example.save") }}
      </v-btn>
      <v-btn
        variant="text"
        color="error"
        class="shadow text-capitalize white--text font-weight-bold"
        @click="$emit('closed')"
      >
        {{ $t("example.cancel") }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["saved"]);
import { onMounted } from "vue";
import {
  form,
  moveItemDown,
  moveItemUp,
  handleShow,
  loadingPost,
  submited,
} from "./index.js";

const saved = async() => {
  let response =await submited();
  if (response) {
    emit("saved");
  }
};
onMounted(() => {
  handleShow();
});
</script>

<template>

  <div class="pagination position-absolute text-center w-100" v-if="config.total" >
    <div class="position-relative d-flex flex-column-reverse flex-md-row justify-center">
      <v-pagination
        class="pagination__items"
        @update:model-value="changePage"
        v-model="config.current_page"
        :length="Math.ceil(config.total / config.per_page)"
        :total-visible="7"
      >
        <template #prev="{ onClick, disabled }">
          <v-btn variant="text" @click="onClick" :disabled="disabled">
            <Image
              class="flip-ltr"
              name="paginate-right.svg"
              width="24"
              height="24"
              :style="{ opacity: disabled ? 0.5 : 1 }"
            />
          </v-btn>
        </template>

        <template #next="{ onClick, disabled }">
          <v-btn variant="text" @click="onClick" :disabled="disabled">
            <Image
              class="flip-ltr"
              name="paginate-left.svg"
              width="24"
              height="24"
              :style="{ opacity: disabled ? 0.5 : 1 }"
            />
          </v-btn>
        </template>
      </v-pagination>
      <div class="pagination__info font-weight-bold">
        {{ $t("the_page") }} {{ config.current_page }} {{ $t("of") }}
        {{ config.last_page }}
        {{ $t("page") }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["config"]);
const emit = defineEmits(["change"]);

const changePage = (value) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  emit("change", value);
};
</script>

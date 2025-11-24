<template>
  <section class="position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <HeadingPage
        icon="topics_heading.svg"
        title="topics_crud.record.title"
        description="topics_crud.record.description"
      >
        <div>
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
        </div>
      </HeadingPage>
    </div>

    <Table class="mb-10" :data="items" :headers="headers" :url="url">
      <template v-slot:item.available="{ item }">
        <InputToggle
          v-if="$hasPermission('contact-topics_edit')"
          v-model="item.available"
          :hide-details="true" 
          :url="url"
          :id="item.id"
          name="available"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link
          v-if="$hasPermission('contact-topics_edit')"
          :to="`/${url}/${item.id}/edit`"
        >
          <Image width="30" name="edit.svg" />
        </router-link>
        <Destroy
          title="topics_crud.delete.title"
          description="topics_crud.delete.description"
          v-if="$hasPermission('contact-topics_delete')"
          :url="url"
          :id="item.id"
        />
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed, ref, inject, nextTick } from "vue";
 
const emitter = inject("emitter");
const url = computed(() => "contact-topics");
 
const headers = computed(() => [
  { key: "id" },
  { key: "name" },
  { key: "available" },
  { key: "actions" },
]);
 
const filterOptions = [
  { value: "yes", title: "visible_filter" },
  { value: "no", title: "invisible_filter" },
];
 
const query = ref({
  visible: "",
});
 
const search = (value) => {
  emitter.emit("reload-data");
};
 
const reset = () => {
  query.value = { visible: "" };
  nextTick(() => {
    emitter.emit("reload-data");
  });
};
</script>
<template>
  <section class="position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <HeadingPage
        icon="star.svg"
        title="reviews_crud.record.title"
        description="reviews_crud.record.description"
      >
        <div>
          <Button
            v-if="$hasPermission('customer-reviews_create')"
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
      <template v-slot:item.image="{ item }">
        <v-avatar color="white" size="32" class="rounded-circle">
                <img
                    class="w-100 h-100"
                    :src="item?.image?.path"
                    :alt="item?.name"
                />
            </v-avatar>
      </template>
      <template v-slot:item.customer_type="{ item }">
        {{ item.customer_type.name }}
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link
          v-if="$hasPermission('customer-reviews_edit')"
          :to="`/${url}/${item.id}/edit`"
        >
          <Image width="30" name="edit.svg" />
        </router-link>
        <Destroy
          title="reviews_crud.delete.title"
          description="reviews_crud.delete.description"
          v-if="$hasPermission('customer-reviews_delete')"
          :url="url"
          :id="item.id"
        />
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed } from "vue";
const url = computed(() => "customer-reviews");
const headers = computed(() => [
  { key: "id" },
  {key: "image"},
  { key: "name" },
  { key: "customer_type" },
  { key: "actions" },
]);
</script>

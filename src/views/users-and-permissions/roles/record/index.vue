<template>
    <section class="position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5 ">
        <div class="d-flex justify-space-between align-center flex-wrap">
          <HeadingPage :title="url" description="roles-desc">
            <div>
              <Button
                v-if="$hasPermission('roles_create')"
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
    <Table class="mb-10" :data="items" :headers="headers" :url="url" >
      <template v-slot:item.description="{ item }">
        <p v-if="!item.description"> {{ $t('no-desc') }}</p>
        <p v-else> {{ item.description }}</p>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="mt-1">
            <router-link
          v-if="$hasPermission('roles_edit')"
          :to="`/${url}/${item.id}/edit`"
        >
          <Image width="30" name="edit.svg" />
        </router-link>
        <Destroy
          v-if="$hasPermission('roles_delete')"
          :url="url"
          :id="item.id"
          title="role-del"
          description="role-del-desc"
        />
        </div>
      </template>
    </Table>
    </section>
</template>

<script setup>
import { computed } from "vue";
const url = computed(() => "roles");
const headers = computed(() => [
  { key: "name" },
  { key: "description"},
  { key: "actions"},
]);
</script>
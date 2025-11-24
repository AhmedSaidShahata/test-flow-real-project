<template>
    <section class="position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5 mt-n4">
        <div class="d-flex justify-space-between align-center flex-wrap">
        <HeadingPage :title="url" description="users_crud.record.description">
            <div>
            <Button
                v-if="$hasPermission('users_create')"
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
    <div class="mt-3">
              <Filter @search="search" @reset="reset">
        <FilterCheckbox
          :items="blockedOptions"
          v-model="query.selectedFilter"
          filter-key="blocked"
        />
        <FilterCheckbox
          :items="adminOptions"
          v-model="query.selectedFilter"
          filter-key="admin"
        />
      </Filter>
        </div>
    <Table class="mb-10 users-table" :data="items" :headers="headers" :url="url" :query="mappedQuery">>
      <template v-slot:item.name="{ item }">
        <div class="d-flex justify-start align-center">
            <v-avatar color="grey" size="32" class="rounded-circle">
                <img
                    class="w-100 h-100"
                    v-if="item.image"
                    :src="item.image.path"
                    :alt="item.name"
                />
                <v-icon style="cursor: default;" v-else size="30px" icon="mdi-account-circle" ></v-icon>
            </v-avatar>
            <div class="d-flex align-start flex-column mt-n2 ms-1">
                <span class="ms-2">{{ item.firstname + " "+ item.lastname }}</span>
                <span v-if="item.role?.name" class="ms-2 size-14 white--text primary text-no-wrap rounded px-2 text-center bg-primary">{{ item.role?.name }}</span>
            </div>
        </div>
      </template>
      <template v-slot:item.phone="{item}">
        {{ item?.phone ? `${item.phone.country_code}${item.phone.number}` : "" }}
      </template>
      <template v-slot:item.blocked="{ item }">
        <PopupToggle
          v-if="$hasPermission('users_edit')"
          v-model="item.blocked"     
          :url="url"
          :id="item.username"
          name="blocked"
          icon="block-icon.svg"
          :title="item.blocked ? 'users_crud.enable.title' : 'users_crud.block.title'"
          :description="item.blocked ? 'users_crud.enable.description' : 'users_crud.block.description'"
          class="pt-2"
        />
      </template>
      <template v-slot:item.verify-email="{item}">
        <div class="d-flex">
          <Image :name="item?.email_verified ? 'success-icon.svg' : 'fail-icon.svg'" width="25px"/>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
            <router-link
              v-if="$hasPermission('users_edit')"
              :to="`/${url}/${item.username}/edit`"
              class=" mt-2"
            >
              <Image width="30" name="edit.svg" />
        </router-link>
        <Destroy
          v-if="$hasPermission('users_delete')"
          :url="url"
          :id="item.username"
          title="users_crud.delete.title"
          description="users_crud.delete.description"
        />
      </template>
    </Table>
    </section>
</template>
 
<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import emitter from "@/plugins/emitter/index";
import { useI18n } from 'vue-i18n';


const { t } = useI18n();
const url = ref("users");
const headers = computed(() => [
  { key: "name" },
  { key: "email" },
  { key: "phone" },
  { key: "blocked" },
  { key: "verify-email" },
  { key: "actions" },
])

const blockedOptions = [
  { value: "no", title: "users_crud.filters.label-1" },
  { value: "yes", title: "users_crud.filters.label-2" }
];

const adminOptions = [
  { value: "yes", title: "users_crud.filters.label-3" }
];

const query = ref({
  selectedFilter: ""
});

const mappedQuery = computed(() => {
  const [filterKey, value] = query.value.selectedFilter ? query.value.selectedFilter.split('_') : ['', ''];
  return filterKey ? { [filterKey]: value } : {};
});
 
const search = (value) => {
  emitter.emit("reload-data");
};
 
const reset = () => {
  query.value.selectedFilter = "";
  nextTick(() => {
    emitter.emit("reload-data");
  });
};

</script>
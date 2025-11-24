<template>
  <section class="position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <HeadingPage
        icon="blogs_heading.svg"
        title="tags_crud.record.title"
        description="tags_crud.record.description"
      >
        <div>
          <Button
            v-if="$hasPermission('tags_create')"
            class="font-weight-bold text-center ps-12"
            radius="15px"
            min-height="40px"
            min-width="130px"
            color="primary"
            :to="`/${url}/create`"
            icon="plus.svg"
          >
            {{ $t('create') }}
          </Button>
        </div>
      </HeadingPage>
    </div>
    <div class="mt-3">
      <Filter @search="search" @reset="reset">
        <FilterCheckbox
          :items="filterOptions"
          v-model="query.selectedFilter"
          filter-key="visible"
        />
      </Filter>
    </div>
    <Table class="mb-10" :data="items" :headers="headers" :url="url" :query="mappedQuery">
      <template v-slot:item.visible="{ item }">
        <InputToggle
          v-if="$hasPermission('tags_edit')"
          v-model="item.visible"
          :url="url"
          :id="item.id"
          name="visible"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link v-if="$hasPermission('tags_edit')" :to="`/${url}/${item.id}/edit`">
          <Image width="30" name="edit.svg" />
        </router-link>
        <Destroy
          title="tags_crud.delete.title"
          description="tags_crud.delete.description"
          v-if="$hasPermission('tags_delete')"
          :url="url"
          :id="item.id"
        />
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed, ref, inject, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emitter = inject('emitter');
const url = computed(() => 'tags');

const headers = computed(() => [
  { key: 'id' },
  { key: 'name' },
  { key: 'visible' },
  { key: 'actions' },
]);

const filterOptions = [
  { value: 'yes', title: 'visible_filter' },
  { value: 'no', title: 'invisible_filter' },
];

const query = ref({
  selectedFilter: '',
});

const mappedQuery = computed(() => {
  if (!query.value.selectedFilter) return {};
  const [filterKey, value] = query.value.selectedFilter.split('_');
  return filterKey === 'visible' ? { visible: value } : {};
});

const search = () => {
  emitter.emit('reload-data');
};

const reset = () => {
  query.value.selectedFilter = '';
  nextTick(() => {
    emitter.emit('reload-data');
  });
};
</script>
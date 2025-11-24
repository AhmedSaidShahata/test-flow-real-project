```vue
<template>
  <section class="position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <HeadingPage
        icon="blogs_heading.svg"
        title="blog-categories_crud.record.title"
        description="blog-categories_crud.record.description"
      >
        <div>
          <GenericDialog title="sorting_heading" v-model="showSort" max-width="450px">
            <FormActionSort @closed="showSort = false" @saved="saved" />
          </GenericDialog>

          <OutlinedButton
            v-if="$hasPermission('blog-categories-sort_create')"
            class="font-weight-bold text-center ps-12 me-2 my-1"
            radius="15px"
            min-height="40px"
            min-width="130px"
            color="primary"
            @click="showSort = true"
            icon="plus.svg"
          >
            {{ $t("sort") }}
          </OutlinedButton>
          <Button
            v-if="$hasPermission('blog-categories_create')"
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
          :items="filterOptions"
          v-model="query.selectedFilter"
          filter-key="visible"
        />
      </Filter>
    </div>
    <Table class="mb-10" :data="items" :headers="headers" :url="url" :query="mappedQuery">
      <template v-slot:item.visible="{ item }">
        <InputToggle
          v-if="$hasPermission('blog-categories_edit')"
          v-model="item.visible"
          :url="url"
          :id="item.slug"
          name="visible"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link
          v-if="$hasPermission('blog-categories_edit')"
          :to="`/${url}/${item.slug}/edit`"
        >
          <Image width="30" name="edit.svg" />
        </router-link>
        <Destroy
          title="blog-categories_crud.delete.title"
          description="blog-categories_crud.delete.description"
          v-if="$hasPermission('blog-categories_delete')"
          :url="url"
          :id="item.slug"
        />
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed, ref, inject, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import FormActionSort from '@/components/FormActions/Blogs/Categories/SortGroup/index.vue';

const { t } = useI18n();
const emitter = inject('emitter');
const url = computed(() => 'blog-categories');

const showSort = ref(false);
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

const saved = () => {
  showSort.value = false;
  emitter.emit('reload-data');
};

const reset = () => {
  query.value.selectedFilter = '';
  nextTick(() => {
    emitter.emit('reload-data');
  });
};
</script>
```
<template>
  <section class="blogs-content position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <HeadingPage
        icon="blogs-dark.svg"
        title="blogs_crud.record.title"
        description="blogs_crud.record.description"
      >
        <div>
          <Button
            v-if="$hasPermission('blogs_create')"
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

    <div class="my-5 d-flex justify-end">
      <CategoryFilter
        name="otherFilters"
        class="me-2"
        :items="blogCategories"
        v-model="query.blog_category"
      />
      <Filter @search="search" @reset="reset" class="blogs-content--filter">
       <FilterCheckbox
          :items="filterOptions"
          v-model="query.selectedFilter"
          filter-key="visible"
        />
      </Filter>
    </div>

    <Table class="mb-10" :data="items" :headers="headers" :url="url" :query="mappedQuery" >
      <template v-slot:item.blog_category="{ item }">
        <div v-if="item.blog_category">
          {{ item.blog_category.name }}
        </div>
        <span v-else class="text-grey">{{ t('no-category') }}</span>
      </template>

      <template v-slot:item.visible="{ item }">
        <InputToggle
          v-if="$hasPermission('blogs_edit')"
          v-model="item.visible"
          :url="url"
          :id="item.slug"
       
          name="visible"
        />
      </template>

      <template v-slot:item.actions="{ item }">
        <router-link  v-if="$hasPermission('blogs_edit')" :to="`/${url}/${item.slug}/edit`">
          <Image width="30" name="edit.svg" />
        </router-link>
        <router-link class="ms-1" v-if="$hasPermission('blogs_edit')" :to="`/${url}/${item.slug}/media`">
          <Image width="30" name="gallery-edit.svg" />
        </router-link>

        <Destroy
          title="blogs_crud.delete.title"
          description="blogs_crud.delete.description"
          v-if="$hasPermission('blogs_delete')"
          :url="url"
          :id="item.slug"
        />
      </template>
    </Table>
  </section>
</template>

<script setup>
import CategoryFilter from '@/components/CategoryFilter/index.vue'

import { computed, ref, onMounted, watch, nextTick, inject } from 'vue'
import useApi from '@/composables/useApi.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { get } = useApi()
const blogCategories = ref([])
const selectedFilters = ref([])

const url = computed(() => 'blogs')
const emitter = inject('emitter')

const headers = computed(() => [
  { key: 'id' },
  { key: 'name' },
  { key: 'blog_category' },
  { key: 'visible' },
  { key: 'actions' }
])

// Filtration
const getBlogCategories = async () => {
  let response = await get('blog-categories?pagination=all&visible=yes')

  let blogCategoriesReduced =
    response?.data?.data?.map((category) => ({
      id: category.id,
      label: category.name
    })) || []


  return blogCategoriesReduced
}

const filterOptions = [
  { value: 'yes', title: 'visible_filter' },
  { value: 'no', title: 'invisible_filter' }
]

const query = ref({
  selectedFilter: '',
  blog_category: '',
});

const search = (value) => {
  emitter.emit('reload-data')
}

const mappedQuery = computed(() => {
  const result = {};
  if (query.value.selectedFilter) {
    const [filterKey, value] = query.value.selectedFilter.split('_');
    if (filterKey === 'visible') result.visible = value;
  }
  if (query.value.blog_category) result.blog_category = query.value.blog_category;
  return result;
});

const reset = () => {
  query.value = {
    selectedFilter: '',
    blog_category: '',
  };
  nextTick(() => {
    emitter.emit('reload-data');
  });
};

onMounted(async () => {
  blogCategories.value = await getBlogCategories()
})
</script>
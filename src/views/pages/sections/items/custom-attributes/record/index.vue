<template>
  <section class="bg-white pa-5 ms-0 ms-lg-n6 rounded-xl position-relative">
    <Breadcrumbs
      :descriptionKey="'items_custom_attr.breadcrumb_desc1'"
      :items="breadcrumbItems"
      class="mb-4"
    />
    <Table v-if="shouldShowTable" :headers="headers" :url="url" :key="tableKey" class="mb-10">
      <template v-slot:item.controls="{ item }">
        <div class="d-flex align-center ga-2 justify-center">
          <Image
            name="edit-gradient.png"
            v-if="$hasPermission('pages_edit')"
            @click="navigateTo(item)"
            class="cursor-pointer"
          />
        </div>
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const path = ref('')
const url = ref('')
const identifier = ref('')
const itemIdentifier = ref('')

const shouldShowTable = computed(() => {
  return path.value && url.value
})

const headers = computed(() => [
  { key: 'id' },
  { key: 'key' },
  { key: 'name' },
  { key: 'value' },
  { key: 'controls' }
])

const tableKey = ref(0)

const breadcrumbItems = computed(() => [
  {
    titleKey: 'sections_crud.breadcrumb_h1',
    disabled: false,
    route: '/pages'
  },
  {
    titleKey: `sections_crud.breadcrumb_h2` || 'sections_crud_breadcrumb.h2',
    disabled: true,
    route: `/pages/${path.value}/sections`
  },
  {
    titleKey: `items_crud.breadcrumb_h3` || 'sections_crud_breadcrumb.h2',
    disabled: true,
    route: `/pages/${path.value}/sections/${identifier.value}/section-items`
  },
  {
    titleKey: `items_custom_attr.breadcrumb_h4` || 'sections_crud_breadcrumb.h2',
    disabled: true,
    route: ''
  }
])

const navigateTo = (item) => {
  router.push(
    `/pages/${path.value}/sections/${identifier.value}/section-items/${itemIdentifier.value}/custom-attributes/${item.key}/edit`
  )
}

onMounted(() => {
  path.value = route.params.path
  identifier.value = route.params.identifier
  itemIdentifier.value = route.params.itemIdentifier
  url.value = `pages/${path.value}/sections/${identifier.value}/section-items/${itemIdentifier.value}/custom-attributes`
  console.log(url.value);
})
</script>
<style scoped>
::v-deep .v-data-table thead th:last-child {
  justify-items: center;
}
</style>

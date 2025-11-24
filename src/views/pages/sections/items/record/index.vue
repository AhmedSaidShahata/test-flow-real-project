<template>
  <section class="bg-white pa-5 ms-0 ms-lg-n6 rounded-xl position-relative">
    <Breadcrumbs
      :descriptionKey="'items_crud.breadcrumb_desc1'"
      :items="breadcrumbItems"
      class="mb-4"
    />
    <Table v-if="shouldShowTable" :headers="headers" :url="url" :key="tableKey" class="mb-10">
      <template v-slot:item.controls="{ item }">
        <div class="d-flex align-center ga-2">
                    <v-tooltip
            v-if="item.has_custom_attributes && $hasPermission('pages-sections-section-items-custom-attributes_view')"
            location="bottom end"
            content-class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <Image
                name="custom-attributes.svg"
                v-bind="props"
                @click="showCustAttributes(item)"
                class="cursor-pointer"
              />
            </template>
            <span>{{ $t('show_custom_attributes') }}</span>
          </v-tooltip>
          <v-tooltip
            v-if="$hasPermission('pages-sections-section-items_view')"
            :text="t('items_crud.tooltips_view')"
            location="bottom end"
            content-class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <Image
                name="view-gradient.svg"
                v-bind="props"
                @click="openSectionDialog(item)"
                class="cursor-pointer"
              />
            </template>
          </v-tooltip>
          <v-tooltip
            v-if="$hasPermission('pages-sections-section-items_edit')"
            :text="t('items_crud.tooltips_edit')"
            location="bottom end"
            content-class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <Image
                name="edit-gradient.png"
                v-bind="props"
                @click="navigateTo(item)"
                class="cursor-pointer"
              />
            </template>
          </v-tooltip>
        </div>
      </template>
    </Table>

    <PageViewDialog v-model="SectionsDialog" :selectedItem="passedItem" :loading="loadingSection" />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import useApi from '@/composables/useApi'
import PageViewDialog from '@/components/PagesItemsDialog/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { get } = useApi()
const router = useRouter()
const route = useRoute()

const path = ref('')
const url = ref('')
const identifier = ref('')

const shouldShowTable = computed(() => {
  return path.value && url.value
})

const headers = computed(() => [
  { key: 'id' },
  { key: 'name' },
  { key: 'title' },
  { key: 'identifier' },
  { key: 'controls' }
])

const SectionsDialog = ref(false)
const selectedItem = ref(null)
const passedItem = ref(null)
const loadingSection = ref(false)
const tableKey = ref(0)

const breadcrumbItems = computed(() => [
  {
    titleKey: 'sections_crud.breadcrumb_h1', // Translation key for "Pages"
    disabled: false,
    route: '/pages'
  },
  {
    titleKey: `sections_crud.breadcrumb_h2` || 'sections_crud_breadcrumb.h2', // Specific or generic section title key
    disabled: true,
    route: `/pages/${path.value}/sections`
  },
  {
    titleKey: `items_crud.breadcrumb_h3` || 'sections_crud_breadcrumb.h2', // Specific or generic section title key
    disabled: true,
    route: ''
  }
])

const openSectionDialog = async (item) => {
  SectionsDialog.value = true
  loadingSection.value = true

  // Set the initial data from the table item
  selectedItem.value = item
  try {
    const response = await get(
      `pages/${path.value}/sections/${identifier.value}/section-items/${selectedItem.value.identifier}`
    )

    passedItem.value = response.data.section_item
  } catch (error) {
    console.error('Error fetching section:', error)
    selectedItem.value = item
  } finally {
    loadingSection.value = false
  }
}

const navigateTo = (item) => {
  router.push(
    `/pages/${path.value}/sections/${identifier.value}/section-items/${item.identifier}/edit`
  )
}

const showCustAttributes = (item) => {
  router.push(
    `/pages/${path.value}/sections/${identifier.value}/section-items/${item.identifier}/custom-attributes`
  )
}

onMounted(() => {
  path.value = route.params.path
  identifier.value = route.params.identifier
  url.value = `pages/${path.value}/sections/${identifier.value}/section-items`
})
</script>

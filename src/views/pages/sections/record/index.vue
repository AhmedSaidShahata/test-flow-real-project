<template>
  <section class="bg-white pa-5 ms-0 ms-lg-n6 rounded-xl position-relative">
    <Breadcrumbs :descriptionKey="'sections_crud.h1_desc'" :items="breadcrumbItems" class="mb-4" />
    <Table v-if="shouldShowTable" :headers="headers" :url="url" :key="tableKey" class="mb-10">
      <template v-slot:item.controls="{ item }">
        <div class="d-flex align-center ga-2">
          <v-tooltip
            v-if="$hasPermission('pages-sections-section-items_view') && item.has_items"
            :text="t('sections_crud.tooltips_section_items')"
            location="bottom end"
            content-class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <Image
                name="sections-gradient.png"
                v-bind="props"
                @click="navigateTo(`sections/${item.identifier}/section-items`)"
                class="cursor-pointer"
              />
            </template>
          </v-tooltip>
          <v-tooltip
            v-if="
              item.has_custom_attributes && $hasPermission('pages-sections-custom-attributes_view')
            "
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
            v-if="$hasPermission('pages-sections_view')"
            :text="t('sections_crud.tooltips_view')"
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
            v-if="$hasPermission('pages-sections_edit')"
            :text="t('sections_crud.tooltips_edit')"
            location="bottom end"
            content-class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <Image
                name="edit-gradient.png"
                v-bind="props"
                @click="navigateTo(`sections/${item.identifier}/edit`)"
                class="cursor-pointer"
              />
            </template>
          </v-tooltip>
        </div>
      </template>
    </Table>

    <PageViewDialog
      v-model="SectionsDialog"
      :selectedSection="selectedSection"
      :loading="loadingSection"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import useApi from '@/composables/useApi'
import PageViewDialog from '@/components/PageSectionsDialogue/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { get } = useApi()
const router = useRouter()
const route = useRoute()

const path = ref('')
const url = ref('')

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
const selectedSection = ref(null)
const loadingSection = ref(false)
const tableKey = ref(0)

// Define breadcrumb items based on current route
const breadcrumbItems = computed(() => [
  {
    titleKey: 'sections_crud.breadcrumb_h1',
    disabled: false,
    route: '/pages'
  },
  {
    titleKey: `sections_crud.breadcrumb_h2` || 'sections_crud_breadcrumb.h2',
    disabled: true,
    route: ''
  }
])

const openSectionDialog = async (item) => {
  SectionsDialog.value = true
  loadingSection.value = true

  // Set the initial data from the table item
  selectedSection.value = item

  try {
    const { data } = await get(`pages/${path.value}/sections/${item.identifier}`)
    console.log('API Response:', data)
    selectedSection.value = data.section || data.page || data
  } catch (error) {
    console.error('Error fetching section:', error)
    selectedSection.value = item
  } finally {
    loadingSection.value = false
  }
}

const navigateTo = (destination) => {
  router.push(`/pages/${path.value}/${destination}`)
}

const showCustAttributes = (item) => {
  router.push(`/pages/${path.value}/sections/${item.identifier}/custom-attributes`)
}

onMounted(() => {
  path.value = route.params.path
  url.value = `pages/${path.value}/sections`
})
</script>

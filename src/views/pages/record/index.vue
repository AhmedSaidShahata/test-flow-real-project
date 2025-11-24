<template>
  <section class="bg-white pa-5 ms-0 ms-lg-n6 rounded-xl position-relative">
    <HeadingPage
      :title="$t('pages_crud.h1')"
      icon="heading-pages.svg"
      :description="$t('pages_crud.h1_desc')"
      class="mb-4"
    />
    <Table :headers="headers" :url="url" :key="tableKey" class="mb-10">
      <template v-slot:item.controls="{ item }">
        <div class="d-flex align-center ga-2">
          <v-tooltip
            v-if="$hasPermission('pages-keywords_view')"
            location="bottom end"
            content-class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <Image
                name="grad-key.svg"
                v-bind="props"
                @click="navigateTo(item, 'keywords')"
                class="cursor-pointer"
              />
            </template>
            <span>{{ $t('pages_crud.tooltip_keywords') }}</span>
          </v-tooltip>
          <v-tooltip
            v-if="$hasPermission('pages-sections_view')"
            location="bottom end"
            content-class="custom-tooltip"
            
          >
            <template v-slot:activator="{ props }">
              <Image
                name="sections-gradient.png"
                v-bind="props"
                @click="navigateTo(item, 'sections')"
                class="cursor-pointer"
              />
            </template>
            <span>{{ $t('pages_crud.tooltip_sections') }}</span>
          </v-tooltip>
          <v-tooltip
            v-if="$hasPermission('pages_view')"
            location="bottom end"
            content-class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <Image
                name="view-gradient.svg"
                v-bind="props"
                @click="openPageDialog(item)"
                class="cursor-pointer"
              />
            </template>
            <span>{{ $t('pages_crud.tooltip_view') }}</span>
          </v-tooltip>
          <v-tooltip
            v-if="$hasPermission('pages_edit')"
            location="bottom end"
            content-class="custom-tooltip"
          >
            <template v-slot:activator="{ props }">
              <Image
                name="edit-gradient.png"
                v-bind="props"
                @click="navigateTo(item, 'edit')"
                class="cursor-pointer"
              />
            </template>
            <span>{{ $t('pages_crud.tooltip_edit') }}</span>
          </v-tooltip>
        </div>
      </template>
    </Table>
    <PageViewDialog
      v-model="pagesDialog"
      :selected-page="selectedPage"
      :loading="loadingPage"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import useApi from '@/composables/useApi'
import PageViewDialog from '@/components/PageViewDialogue/index.vue'
import { useRouter } from 'vue-router'

const { get } = useApi()
const router = useRouter()

const url = computed(() => 'pages')
const headers = computed(() => [
  { key: 'id' },
  { key: 'name' },
  { key: 'title' },
  { key: 'path' },
  { key: 'controls' }
])

const pagesDialog = ref(false)
const selectedPage = ref(null)
const loadingPage = ref(false)

const openPageDialog = async (item) => {
  pagesDialog.value = true
  selectedPage.value = null
  selectedPage.value = item
}

const navigateTo = (item, destination) => {
  router.push(`pages/${item.path}/${destination}`)
}
</script>

<style scoped>
</style>
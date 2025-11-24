<template>
  <v-data-table
    :headers="
      headers.map((header) => ({
        ...header,
        title: $t(`${header.key}`),
        sortable: false
      }))
    "
    class="fixed-table"
    :items="items.length ? items : data"
    :loading="loading"
    :loading-text="$t('example.loading')"
    :no-data-text="$t('example.no-data')"
    :items-per-page="-1"
    :show-footer="false"
    :hide-default-footer="true"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td v-for="header in headers" :key="header.key">
          <slot :name="`item.${header.key}`" :item="item">
            {{ item[header.value ? header.value : header.key] }}
          </slot>
        </td>
      </tr>
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <div class="text-center">
          <Pagination @change="loadItems" :config="config" />
        </div>
      </div>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import Pagination from '@/components/Shared/Pagination/index.vue'
import useApi from '@/composables/useApi'
const { get } = useApi()
const emitter = inject('emitter')
const props = defineProps({
  headers: Array,
  url: String,

  query: {
    type: {
    type: Object,
    default: () => ({}),
  },
    data: Array,
    default: () => ({})
  }
})

const items = ref([])
const loading = ref(true)
const config = reactive({})

const currentPage = ref(1)

const paginateConfig = (data) => {
  currentPage.value = config.current_page
  if (currentPage.value > 1 && items?.value?.length == 1) {
    currentPage.value -= 1
  }
  Object.assign(config, data)
}

const loadItems = async (page = 1) => {
  loading.value = true
  try {
    const filteredQuery = Object.fromEntries(
      Object.entries(props.query).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    )

    const { data } = await get(`/${props.url}?page=${page}`, filteredQuery)

    items.value = data.data
    paginateConfig(data.meta)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadItems()
  emitter.off('reload-data')
  emitter.on('reload-data', () => {
    loadItems(currentPage.value)
  })
})
</script>


<style scoped>

.fixed-table table {
  table-layout: fixed;
}

.v-data-table table td:last-child,
.v-data-table table th:last-child {
  width: 150px;
}
</style>
import { ref, nextTick, computed } from 'vue'
import useApi from '@/composables/useApi'
import { useRoute, useRouter } from 'vue-router'

const url = 'keywords'
const form = ref({
  keywords: []
})

const renderForm = ref(true)
const pageSlug = ref('')

const { post, loadingPost, get, loadingGet } = useApi()
const router = useRouter()
const route = useRoute()

const allKeywords = ref([])
const pageKeywords = ref([]) // related to api

const workingKeywords = ref([]) // frontend copy for manipulation

const availableKeywords = computed(() => {
  const selectedIds = workingKeywords.value.map((kw) => kw.id)
  return allKeywords.value.filter((kw) => !selectedIds.includes(kw.id))
})

const formData = () => {
  const formData = new FormData()

  const keywordsToSend = [...workingKeywords.value]
  if (keywordsToSend.length) {
    keywordsToSend.forEach((keyword, index) => {
      formData.append(`keywords[${index}]`, keyword.id)
    })
  } else {
    formData.append(`keywords`, [])
  }

  return formData
}

// add keywords to frontend array only
const addKeywords = () => {
  // if (!form.value.keywords || form.value.keywords.length === 0) {
  //   console.log('No keywords selected to add')
  //   return
  // }

  const newKeywords = form.value.keywords.map((item) => {
    if (typeof item === 'object' && item !== null && item.id) {
      return item
    } else {
      const foundKeyword = allKeywords.value.find((kw) => kw.id === item)
      return foundKeyword || { id: item, name: `Keyword ${item}` }
    }
  })

  workingKeywords.value = [...workingKeywords.value, ...newKeywords]
  form.value.keywords = []
}

const submited = async (router) => {
  const response = await post(`/pages/${pageSlug.value}/keywords`, formData())

  if (response) {
    pageKeywords.value = [...workingKeywords.value]
    router.push(`/pages`);
  }
}

const handleShow = async (route) => {
  pageSlug.value = route?.params?.path
  await getPageKeywords()
}

const resetForm = () => {
  form.value = {
    keywords: []
  }
  workingKeywords.value=[]

  renderForm.value = false
  nextTick(() => {
    renderForm.value = true
  })
}

const getAllKeywords = async () => {
  // Getting visible keywords only
  const response = await get('/keywords?pagination=all&visible=yes')
  allKeywords.value = response?.data?.data || []
}

const getPageKeywords = async () => {
  if (!pageSlug.value) return
  const response = await get(`/pages/${pageSlug.value}/keywords?pagination=all&visible=yes`)
  pageKeywords.value = response?.data?.data || []

  workingKeywords.value = [...pageKeywords.value]
}

const deleteKeywordFromPage = async (keywordToDelete) => {
  workingKeywords.value = workingKeywords.value.filter((kw) => kw.id !== keywordToDelete.id)
}

export {
  post,
  get,
  loadingPost,
  router,
  submited,
  pageSlug,
  renderForm,
  form,
  handleShow,
  formData,
  resetForm,
  url,
  getAllKeywords,
  getPageKeywords,
  allKeywords,
  pageKeywords,
  workingKeywords,
  availableKeywords,
  addKeywords,
  deleteKeywordFromPage,
  route,
  loadingGet
}

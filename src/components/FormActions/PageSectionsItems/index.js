import { ref, nextTick } from 'vue'
import useApi from '../../../composables/useApi'
import { useRouter } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'

const url = 'pages'
const hasTitle = ref(false)
const hasDescription = ref(false)
const form = ref({
  name: '',
  title: '',
  description: ''
})
const renderForm = ref(true)
const identifier = ref('')
const path = ref('')
const itemIdentifier = ref('')
const { post, loadingPost, get } = useApi()
const router = useRouter()

const formData = () => {
  const { localeValue } = useLocaleStore()
  const formData = new FormData()

  formData.append('name', form.value.name)

  if (hasTitle.value) {
    formData.append('title', form.value.title ?? '')
  }

  if (hasDescription.value) {
    formData.append('description', form.value.description ?? '')
  }

  formData.append('_method', 'put')
  formData.append('locale', localeValue.value)

  return formData
}

const submited = async (router) => {
  let response
  response = await post(
    `/${url}/${path.value}/sections/${identifier.value}/section-items/${itemIdentifier.value}`,
    formData()
  )
  if (response) {
    router.push(`/${url}/${path.value}/sections/${identifier.value}/section-items`)
  }
}

const handleShow = async (route) => {
  path.value = route?.params?.path
  identifier.value = route?.params?.identifier
  itemIdentifier.value = route?.params?.itemIdentifier
  const response = await get(
    `/${url}/${path.value}/sections/${identifier.value}/section-items/${itemIdentifier.value}`
  )
  const section = response?.data?.section_item
  hasTitle.value = section?.section?.has_items_title
  hasDescription.value = section?.section.has_items_description
  form.value = section || {}
}

const resetForm = () => {
  form.value = {
    name: '',
    title: '',
    description: ''
  }
  renderForm.value = false
  nextTick(() => {
    renderForm.value = true
  })
}

export {
  post,
  get,
  loadingPost,
  router,
  submited,
  identifier,
  path,
  renderForm,
  form,
  handleShow,
  formData,
  resetForm,
  url,
  hasTitle,
  hasDescription
}

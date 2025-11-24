import { ref, nextTick } from 'vue'
import useApi from '../../../composables/useApi'
import { useRouter } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'

const url = 'pages'
const form = ref({
  name: '',
  value: ''
})
const renderForm = ref(true)
const identifier = ref('')
const path = ref('')
const attributeKey = ref('')
const { post, loadingPost, get } = useApi()
const router = useRouter()

const formData = () => {
  const { localeValue } = useLocaleStore()
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('value', form.value.value)
  formData.append('_method', 'put')
  formData.append('locale', localeValue.value)
  return formData
}

const submited = async (router) => {
  let response
  response = await post(
    `/${url}/${path.value}/sections/${identifier.value}/custom-attributes/${attributeKey.value}`,
    formData()
  )
  if (response) {
    router.push(`/${url}/${path.value}/sections/${identifier.value}/custom-attributes`)
  }
}

const handleShow = async (route) => {
  path.value = route?.params?.path
  identifier.value = route?.params?.identifier
  attributeKey.value = route?.params?.attributeKey
  const response = await get(
    `/${url}/${path.value}/sections/${identifier.value}/custom-attributes/${attributeKey.value}`
  )
  const attribute = response?.data?.custom_attribute
  form.value = attribute || {}
}

const resetForm = () => {
  form.value = {
    name: '',
    value: ''
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
  url
}

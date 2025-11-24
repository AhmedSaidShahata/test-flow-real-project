import { ref, nextTick } from 'vue'
import useApi from '../../../composables/useApi'
import { useRouter } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'

const uiTitle = ref('')

const url = 'pages'
const form = ref({
  name: '',
  title: '',
  description: ''
})
const renderForm = ref(true)
const id = ref('')
const { post, loadingPost, get } = useApi()
const router = useRouter()


const formData = () => {
  const { localeValue } = useLocaleStore()
  const formData = new FormData()
  
  // Only append fields that are not empty
  if (form.value.name && form.value.name.trim() !== "") {
    formData.append('name', form.value.name)
  }
  
  if (form.value.title && form.value.title.trim() !== "") {
    formData.append('title', form.value.title)
  }
  
  if (form.value.description && form.value.description.trim() !== "") {
    formData.append('description', form.value.description)
  }
  
  formData.append('_method', 'put')
  formData.append('locale', localeValue.value)
  
  return formData
}

const submited = async (router) => {
  let response
  response = await post(`/${url}/${id.value}`, formData())
  if (response) {
    router.push(`/${url}`)
  }
}

const handleShow = async (route) => {
  id.value = route?.params?.path
    const response = await get(`/${url}/${id.value}`)
    const page = response?.data?.page
    console.log(response);
    uiTitle.value = response?.data?.page?.name
    form.value = page || {}
  
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
  id,
  renderForm,
  form,
  handleShow,
  formData,
  resetForm,
  url,
  uiTitle
}

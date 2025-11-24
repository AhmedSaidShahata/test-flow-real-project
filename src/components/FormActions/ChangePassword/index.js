import { ref, nextTick } from 'vue'
import useApi from '../../../composables/useApi'
import { useRouter } from 'vue-router'


const { post, loadingPost } = useApi()
const router = useRouter()
const renderForm = ref(true)
const url = 'change-password'

const form = ref({
  password: '',
  new_password: '',
  new_password_confirmation: ''
})

const formData = () => {
  const formData = new FormData()
  formData.append('password', form.value.password)
  formData.append('new_password', form.value.new_password)
  formData.append('new_password_confirmation', form.value.new_password_confirmation)

  return formData
}


const resetForm = () => {
  renderForm.value = false
  form.value = {
    password: '',
    new_password: '',
    new_password_confirmation: ''
  }
  nextTick(() => {
    renderForm.value = true
  })
}

const submited = async () => {
  const formattedData = formData()
  const response = await post('/change-password', formattedData)

  if (response) {
    resetForm()
  }
}

export {
  post,
  loadingPost,
  router,
  submited,
  form,
  formData,
  url, renderForm
}

import { ref, nextTick } from 'vue'
import useApi from '../../../composables/useApi'
import { useRouter } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import { useAuthStore } from '@/stores/auth'

const { post, loadingPost, get, loadingGet } = useApi()
const renderForm = ref(!loadingGet)
const router = useRouter()

const url = 'profile'

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  country_code: ''
})

const handleShow = async (route) => {
  const response = await get(`/profile`)
  const profile = response?.data?.user
  form.value = { ...profile, phone: profile?.phone.number, country_code: profile?.phone.country_code }
}

const formData = () => {
  const { localeValue } = useLocaleStore()
  const formData = new FormData()
  formData.append('firstname', form.value.firstname)
  formData.append('lastname', form.value.lastname)
  if(form.value.phone){
  formData.append('phone[number]', form.value.phone)
  formData.append('phone[country_code]', form.value.country_code)
  }


  return formData
}


const resetForm = () => {
  form.value = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country_code: ''
  }
  renderForm.value = false
  handleShow()
  nextTick(() => {
    renderForm.value = true
  })
}

const submited = async () => {
  const formattedData = formData()
  const response = await post('/profile', formattedData)

  if (response) {
    resetForm()
  }
}

export {
  post,
  get,
  loadingPost,
  router,
  submited,
  renderForm,
  form,
  handleShow,
  formData,
  resetForm,
  url
}

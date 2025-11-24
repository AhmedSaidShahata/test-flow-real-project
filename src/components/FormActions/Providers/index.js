import { ref, nextTick, watch } from 'vue'
import useApi from '../../../composables/useApi'
import { useRouter, useRoute } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'

const url = 'providers'

const preview = ref(null)

const previewFile = (file) => {
  if (!file) return

  form.value.logo = {
    path: URL.createObjectURL(file),
    file: file
  }
}

const form = ref({
  display_name: '',
  registration_number: '',
  legal_name: '',
  identifier: '',
  country: null,
  city: null,
  phone: '',
  country_code: '00966',
  logo: { path: null },
  contact_name: '',
  contact_email: ''
})

const renderForm = ref(false)
const isEdit = ref(false)
const id = ref('')
const filteredCities = ref([])
const loadingCities = ref(false)
const isInitialLoad = ref(false)

const { post, loadingPost, get, loadingGet } = useApi()
const router = useRouter()
const route = useRoute()
const localeStore = useLocaleStore()

const formData = () => {
  const formData = new FormData()

  if (!isEdit.value) {
    formData.append('display_name', form.value.display_name)
    formData.append('registration_number', form.value.registration_number)
    formData.append('legal_name', form.value.legal_name)
    formData.append('identifier', form.value.identifier)
    formData.append('city', form.value.city)
    formData.append('contact_name', form.value.contact_name)
    formData.append('contact_email', form.value.contact_email)

    if (form.value.logo?.file instanceof File) {
      formData.append('logo', form.value.logo.file)
    }

    if (form.value.phone) {
      formData.append('contact_phone[number]', form.value.phone ?? '')
      formData.append('contact_phone[country_code]', form.value.country_code ?? '')
    }
  }

  if (isEdit.value) {
    formData.append('_method', 'put')
    formData.append('locale', localeStore?.localeValue?.value)
    formData.append('display_name', form.value.display_name)
    formData.append('registration_number', form.value.registration_number)
    formData.append('legal_name', form.value.legal_name)
    formData.append('identifier', form.value.identifier)
    formData.append('city', form.value.city)
    formData.append('contact_name', form.value.contact_name)
    formData.append('contact_email', form.value.contact_email)

    if (form.value.logo?.file instanceof File) {
      formData.append('logo', form.value.logo.file)
    }

    if (form.value.phone) {
      formData.append('contact_phone[number]', form.value.phone ?? '')
      formData.append('contact_phone[country_code]', form.value.country_code ?? '')
    }
  }

  return formData
}

const getCities = async (preserveSelectedCity = false) => {
  if (!form.value.country) {
    filteredCities.value = []
    form.value.city = null
    return
  }

  const currentCityId = preserveSelectedCity ? form.value.city : null
  loadingCities.value = true

  try {
    const response = await get(`/countries/${form.value.country}/cities?pagination=all`)
    filteredCities.value = response?.data?.data || []

    if (filteredCities.value.length === 0) {
      form.value.city = null
    } else if (preserveSelectedCity && currentCityId) {
      const cityExists = filteredCities.value.some((city) => city.id === currentCityId)
      form.value.city = cityExists ? currentCityId : null
    }
  } catch (error) {
    console.error('Error fetching cities:', error)
    filteredCities.value = []
    form.value.city = null
  } finally {
    loadingCities.value = false
  }
}


watch(
  () => form.value.country,
  async (newVal, oldVal) => {
    if (!newVal) {
      filteredCities.value = []
      form.value.city = null
      return
    }

    if (!isInitialLoad.value && oldVal && newVal !== oldVal) {
      form.value.city = null
    }

    await getCities(isInitialLoad.value)

    if (isInitialLoad.value) {
      isInitialLoad.value = false
    }
  }
)

const submited = async (router) => {
  let response
  if (isEdit.value) {
    response = await post(`/${url}/${id.value}`, formData())
  } else {
    response = await post(`/${url}`, formData())
  }
  if (response) {
    router.push(`/${url}`)
  }
}

const handleShow = async (route) => {
  isEdit.value = !!route?.params?.id
  id.value = route?.params?.id

  if (isEdit.value) {
    renderForm.value = false
    isInitialLoad.value = true

    const response = await get(`/${url}/${id.value}`)
    const provider = response?.data?.provider

    form.value = {
      display_name: provider?.display_name || '',
      registration_number: provider?.registration_number || '',
      legal_name: provider?.legal_name || '',
      identifier: provider?.identifier || '',
      contact_name: provider?.contact_name || '',
      contact_email: provider?.contact_email || '',
      phone: provider?.contact_phone?.number || '',
      country_code: provider?.contact_phone?.country_code || '00966',
      country: provider?.city?.country?.id || null,
      city: provider?.city?.id || null,
      logo: {
        path: provider?.logo ? provider?.logo?.path : null,
        file: null
      }
    }

    // if country exists, load cities and wait for them to load
    if (form.value.country) {
      await getCities(true) // preserveSelectedCity = true to maintain the selected city
    }

    renderForm.value = true
  } else {
    // create mode -> reset everything
    filteredCities.value = []
    isInitialLoad.value = false
    renderForm.value = true
  }
}

const resetForm = () => {
  if (form.value.logo?.path && form.value.logo.path.startsWith('blob:')) {
    URL.revokeObjectURL(form.value.logo.path)
  }

  form.value = {
    display_name: '',
    registration_number: '',
    legal_name: '',
    identifier: '',
    country: null,
    city: null,
    phone: '',
    country_code: '00966',
    logo: { path: null, file: null },
    contact_name: '',
    contact_email: ''
  }

  filteredCities.value = []
  isInitialLoad.value = false
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
  route,
  submited,
  id,
  renderForm,
  form,
  isEdit,
  handleShow,
  formData,
  resetForm,
  url,
  previewFile,
  preview,
  filteredCities,
  getCities,
  loadingCities,
  loadingGet
}

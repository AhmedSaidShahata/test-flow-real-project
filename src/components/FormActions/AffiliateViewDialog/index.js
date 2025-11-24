import { ref} from 'vue'
import useApi from '@/composables/useApi'
import { useLocaleStore } from '@/stores/locale'

const affiliateData = ref(null)
const error = ref(null)
const { get, post, loadingGet, loadingPost, errorsResponse } = useApi()

const formData = () => {
  const { localeValue } = useLocaleStore()
  const formData = new FormData()
  formData.append('approved', 1)
  formData.append('_method', 'put')
  formData.append('locale', localeValue.value)
  return formData
}

const fetchAffiliateData = async (affiliateIden) => {
  try {
    const response = await get(`/affiliates/${affiliateIden}`)
    affiliateData.value = response.data.affiliate
  } catch (err) {
    console.error('Error fetching affiliate data:', err)
    affiliateData.value = null
  }
}

const submited = async (affiliateIden) => {
  try {
    const response = await post(`/affiliates/${affiliateIden}`, formData())
    return true // Indicate success for dialog closing
  } catch (err) {
    console.error('Error saving affiliate data:', err)
    return false
  }
}

export { get, post, loadingGet, loadingPost, submited, affiliateData, error, formData, fetchAffiliateData }
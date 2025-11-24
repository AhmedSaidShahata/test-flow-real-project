import { ref, nextTick } from 'vue'
import useApi from '../../../composables/useApi'
import { useRoute, useRouter } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
// import { useIsEdit } from '@/composables/useIsEdit'

// const { isEdit: _isEdit } = useIsEdit()

const url = 'customer-reviews'
const form = ref({
  name: '',
  position: '',
  text: '',
  image: null,
  rating: 0,
  customer_type: null
})

const renderForm = ref(true)
const isEdit = ref(false)
const id = ref('')

const { post, loadingPost, get } = useApi()
const router = useRouter()
const route = useRoute()
const showValidationError = ref(false)

const previewFile = (file) => {
  if (!file) return;
  
  // Update the form's image structure
  form.value.image = {
    path: URL.createObjectURL(file),
    file: file  // Store the actual file object for FormData
  };
}

const formData = () => {
  const { localeValue } = useLocaleStore();
  const formData = new FormData();

  formData.append('name', form.value.name);
  formData.append('position', form.value.position);
  formData.append('text', form.value.text);
  formData.append('rating', form.value.rating);
  formData.append('locale', localeValue.value)


  // ✅ If customer_type is an object, send its id; otherwise, send the value directly
  const customerType = form.value.customer_type;
  formData.append(
    'customer_type',
    typeof customerType === 'object' && customerType !== null ? customerType.id : customerType
  );

  if (form.value.image?.file instanceof File) {
    formData.append('image', form.value.image.file);
  }

  if (isEdit.value) {
    formData.append('_method', 'put');
    // formData.append('locale', localeValue.value);
  }

  return formData;
};


const submited = async (router) => {
    if (!form.value.rating) {
    showValidationError.value = true
    return
  }
  showValidationError.value = false
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
  isEdit.value = !!route?.params?.id;
  id.value = route?.params?.id;

  if (isEdit.value) {
    const response = await get(`/${url}/${id.value}`);
    const review = response?.data?.customer_review;
    console.log(review);

    // Store the initial customer_type if not already set
    const initialCustomerType = form.value?.customer_type;

    form.value = {
      name: review?.name,
      position: review?.position,
      text: review?.text,
      rating: review?.rating,
      customer_type: initialCustomerType ?? review?.customer_type,
      image: {
        path: review?.image?.path,
        file: null,
      },
    };
  }
};

const resetForm = () => {
  form.value = {
    name: '',
    position: '',
    customer_type: null,
    text: '',
    main_image: '',
    rating: null
  }
  renderForm.value = false
  nextTick(() => {
    renderForm.value = true
  })
}


const customerTypes = ref([])
const getCustomerTypes = async () => {
  const response = await get('/customer-types?pagination=all')
  customerTypes.value = response?.data?.data
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
  isEdit,
  handleShow,
  formData,
  resetForm,
  url,
  previewFile,
  customerTypes,
  getCustomerTypes,
  route,
  showValidationError
}

import { ref, nextTick, computed } from 'vue'
import useApi from '../../../composables/useApi'
import { useRoute, useRouter } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
// import { useIsEdit } from '@/composables/useIsEdit'
import { useField } from 'vee-validate'

// const { isEdit: _isEdit } = useIsEdit()

const url = 'blogs'
const form = ref({
  name: '',
  blogDescription: '',
  blog_category: null,
  slug: '',
  meta_title: '',
  meta_description: '',
  main_image: null,
  tags: []
})
const currentMainImagePath = ref('')

const renderForm = ref(true)
const isEdit = ref(false)
const id = ref('')
const allBlogCategories = ref([])
const loadData = ref(false)

// const slug = ref('')

const preview = ref('')
const { post, loadingPost, get, loadingGet } = useApi()
const router = useRouter()
const route = useRoute()
const currentBlog = ref({})

const formData = () => {
  const { localeValue } = useLocaleStore()
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('description', form.value.blogDescription)
  formData.append('slug', form.value.slug)
  formData.append('meta_title', form.value.meta_title)
  formData.append('meta_description', form.value.meta_description)

  if (form.value.tags && Array.isArray(form.value.tags)) {
    if (!form.value.tags.length) {
      formData.append(`tags`, [])
    } else {
      form.value.tags.forEach((tag, index) => {
        // Check if tag is an object and has an id property
        if (typeof tag === 'object' && tag !== null && tag.id) {
          formData.append(`tags[${index}]`, tag.id)
        } else {
          formData.append(`tags[${index}]`, tag)
        }
      })
    }
  }


  if (
    typeof form.value.blog_category === 'object' &&
    form.value.blog_category !== null &&
    form.value.blog_category.id
  ) {
    const categoryId = form.value.blog_category.id
    const categoryExists = allBlogCategories?.value?.some(cat => cat.id == categoryId)
    if (categoryExists && ((isEdit.value && form.value?.blog_category?.visible) || !isEdit.value)) {
      formData.append(`blog_category`, categoryId)
    }
  } else {
    const categoryExists = allBlogCategories?.value?.some(cat => cat.id == form.value.blog_category)
    if (categoryExists && ((isEdit.value) || !isEdit.value)) {
      formData.append(`blog_category`, form.value.blog_category)
    }
  }
  // formData.append('main_image', form.value.main_image)
  if (form.value.main_image instanceof File) {
    formData.append('main_image', form.value.main_image)
  }
  if (isEdit.value) {
    formData.append('_method', 'put')
    formData.append('locale', localeValue.value)
  }
  return formData
}

const submited = async (router) => {
  let response
  if (isEdit.value) {
    response = await post(`/${url}/${id.value}`, formData())
  } else {
    response = await post(`/${url}`, formData())
    preview.value = ''
  }
  if (response) {
    router.push(`/${url}`)
  }
}

const handleShow = async (route) => {
  isEdit.value = !!route?.params?.id
  id.value = route?.params?.id

  if (isEdit.value) {
    loadData.value = true

    const response = await get(`/${url}/${id.value}`)
    const blog = response?.data?.blog
    currentBlog.value = blog
    currentMainImagePath.value = blog?.main_image?.path
    // form.value = { ...blog, main_image: blog?.main_image?.path } || {}

    // image inaccessible so this is temporary to make sure logic is sound
    form.value = {
      ...blog,
      tags: blog?.tags?.filter((tag) => tag.visible === true),
      main_image: blog?.main_image || null,
      blogDescription: blog?.description
    }
    loadData.value = false
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    blog_category: null,
    slug: '',
    meta_title: '',
    meta_description: '',
    main_image: '',
    tags: []
  }
  preview.value = ''
  currentMainImagePath.value = ''
  renderForm.value = false
  nextTick(() => {
    renderForm.value = true
  })
}

const previewFile = (file) => {
  if (checkFileValidation()) {
    form.value.main_image = file
    preview.value = URL.createObjectURL(file)
  } else {
    return
  }
}

const allTags = ref([])
const getAllTags = async () => {
  const response = await get('/tags?pagination=all&visible=yes')
  allTags.value = response?.data?.data
    ?.filter((tag) => tag.visible === true)
    ?.map((tag) => ({
      id: tag.id,
      name: tag.name
    }))
}
const getBlogCategories = async () => {
  const response = await get('/blog-categories?pagination=all&visible=yes')
  allBlogCategories.value = response?.data?.data
}

const fileValidation = ref(
  !isEdit
    ? 'required|size:1024|mimes:image/jpeg,image/jpeg,image/png|length:1'
    : 'size:1024|mimes:image/jpeg,image/jpeg,image/png|length:1'
)

const mainImageInput = ref(null)
const { meta: mainImageMeta, errorMessage: mainImageError } = useField(
  'main_image',
  isEdit
    ? 'size:1024|mimes:image/jpeg,image/jpeg,image/png|length:1'
    : 'required|size:1024|mimes:image/jpeg,image/jpeg,image/png|length:1'
)

const isMainImageValid = computed(() => {

  return mainImageMeta.valid && !mainImageError.value && form.main_image
})
const checkFileValidation = async () => {
  if (mainImageInput.value) {
    const result = await mainImageInput.value.validate()
    return result.valid
  }
  return false
}
export {
  post,
  get,
  preview,
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
  getAllTags,
  allTags,
  allBlogCategories,
  getBlogCategories,
  route,
  fileValidation,
  currentBlog,
  loadData,
  loadingGet,
  mainImageInput,
  checkFileValidation,
  isMainImageValid,
  currentMainImagePath
}

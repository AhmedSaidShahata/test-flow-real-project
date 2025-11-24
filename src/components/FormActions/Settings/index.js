import { ref, computed } from "vue"
import { useLocaleStore } from "@/stores/locale"
import useApi from "@/composables/useApi"

const { get, post } = useApi()

const form = ref({
  value: "",
  main_image: { path: null },
  number: 1
})

const { localeValue, setLocaleApp } = useLocaleStore();
const section_groups = ref([])
const section = ref({})
const loading = ref(false)

const updatedSettings = computed(() => {
  return section_groups.value.flatMap((section_group) => {
    if (Array.isArray(section_group.project_settings)) {
      return section_group.project_settings
    }
    return []
  })
})

const removeUnusedValidation = (validation) => {
  let text = String(validation || "")
  let wordsToRemove = ["sometimes", "string", "numeric", "boolean", "active_url"]
  wordsToRemove.forEach((word) => {
    let regex = new RegExp(`\\|?${word}\\|?`, "g")
    text = text.replace(regex, "")
  })
  text = text.replace(/^\|+|\|+$/g, "")
  return text
}

const uploadFile = (e, objectData) => {
  form.value.main_image = objectData.file
  form.value.main_image.path = URL.createObjectURL(objectData.file)
}

const handleShowSection = async (groupId, secID, sec, index, groupIndex) => {
  const currentLocale = sec?.selectedLocale || localeValue.value
  section.value = sec

  const res = await get(
    `project-setting-groups/${groupId}/project-setting-sections/${secID}/project-settings/${section.value?.key}`
  )

  if (res) {
    const { project_setting } = res.data
    section_groups.value[groupIndex].project_settings[index] = {
      ...section_groups.value[groupIndex].project_settings[index],
      value: project_setting.value, 
      selectedLocale: currentLocale, 
      translatable: sec.translatable 
    }
  }
}

const handleShow = async (routeId) => {
  const res = await get(`project-setting-groups/${routeId}/project-setting-sections`)
  if (res) {
    const { data } = res.data
    form.value.value = data.value
    form.value.description = data.description
    
    section_groups.value = data.map(group => ({
      ...group,
      project_settings: group.project_settings?.map(setting => ({
        ...setting,
        selectedLocale: setting.selectedLocale || localeValue.value,
      })) || []
    }))
  }
}

const generateFormData = (sectionData) => {
  const formData = new FormData()
  if (sectionData?.type?.name === "boolean") {
    formData.append("value", sectionData.value ? 1 : 0)
  } else {
    formData.append("value", sectionData?.value ?? "")
  }
  formData.append("name", sectionData?.name ?? "")
  formData.append("_method", "put")

  if (form.value.main_image && form.value.main_image.constructor === File) {
    formData.append("image", form.value.main_image)
  }

  if (sectionData?.type?.name === "phone") {
    formData.append("phone[country_code]", sectionData.phone?.country_code ?? "")
    formData.append("phone[number]", sectionData.phone?.number ?? "")
  }

  formData.append("locale", sectionData?.selectedLocale)
  return formData
}

const handleUpdate = async (routeId, secID, sectionData) => {
  loading.value = true
  await post(
    `project-setting-groups/${routeId}/project-setting-sections/${secID}/project-settings/${sectionData.key}`,
    generateFormData(sectionData)
  )
  loading.value = false
}

const submitForm = async (groupId, secID, section) => {
  const finalLocale = section?.selectedLocale || localeValue.value
  
  await handleUpdate(groupId, secID, {
    ...section,
    selectedLocale: finalLocale
  })

  if (section?.translatable) {
    setLocaleApp(finalLocale)
  }
}

export {
  post,
  get,
  form,
  section_groups,
  updatedSettings,
  handleShow,
  handleShowSection,
  removeUnusedValidation,
  uploadFile,
  submitForm,
  generateFormData
}
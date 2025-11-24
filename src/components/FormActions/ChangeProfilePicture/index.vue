<template>
  <Form class="d-flex flex-column flex-sm-row w-100 my-8 ga-10 justify-start">
    <div class="d-flex mx-5">
      <v-img
        v-if="authStore.user?.image?.path"
        style="border-radius: 15px;"
        height="100px"
        cover
        :src="authStore.user?.image?.path"
        width="100px"
      />
      <v-avatar v-else rounded="lg" size="80" variant="outlined" color="grey">
      <v-icon style="cursor: default;" size="80px" icon="mdi-account" ></v-icon>
      </v-avatar> 
    </div>
    <div class="mx-0 mx-sm-7 w-75 mx-5">
      <InputFile
        multiple="false"
        @fileSelected="previewFile"
        @changed="submitFiles"
        validation="required|size:512|mimes:image/jpeg,image/jpg,image/png|length:1"
        :form="form"
        name="file"
        :label="$t('file')"
        class="w-50"
        :loading="loadingPost"
      />
    </div>
  </Form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useApi from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'

const { post, loadingPost } = useApi()
const authStore = useAuthStore()

const form = ref({
  file: []
})

const preview = ref('')


const previewFile = (file) => {
  preview.value = URL.createObjectURL(file)
}

const submitFiles = async () => {
  if (form.value.file.length === 0) return

  const formData = new FormData()

  form.value.file.forEach((file, index) => {
    formData.append(`image`, file)
  })

  await post('profile', formData)
  await authStore.getUser()
}

onMounted(async () => {
  await authStore.getUser()
})
</script>
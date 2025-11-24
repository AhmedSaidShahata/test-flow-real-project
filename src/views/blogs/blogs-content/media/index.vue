<template>
  <CardWrapper class="mb-4">
    <div class="px-4 py-2">
      <HeadingPage
        icon="media_heading.png"
        title="media_crud.title"
        description="media_crud.description"
      />
    </div>
    
    <section class="d-flex flex-wrap py-8 px-0">
      <div class="pt-4 pb-8 py-lg-2 me-0 me-md-n16 w-100 w-lg-33">
        <IntroSection
          title="media_crud.intro_title"
          description="media_crud.description"
        />
      </div>
      
      <!-- Media Display Section -->
      <div class="d-flex flex-wrap pt-4 ps-16 w-100 w-lg-66">
        <!-- File Upload Section -->
        <div class="mb-8 w-100" v-if="$hasPermission('blogs-medias_create')">
          <InputFile
            :form="form"
            name="mediaFile"
            :multiple="true"
            @fileSelected="handleFileSelected"
            @changed="handleFileChanged"
            validation="required|size:1024|mimes:image/jpeg,image/jpg,image/png|length:5"
            :hint="$t('media_crud.max')"
          />
        </div>
        
        <div 
          v-if="filteredMediaItems.length > 0 && $hasPermission('blogs-medias_view')" 
          v-for="media in filteredMediaItems" 
          :key="media.id" 
          class="d-flex"
        >
          <MediaImg
            :path="media.path"
            :id="media.id"
            :alt="media.alt || 'media image'"
            class="w-100 w-md-25 mt-4"
            :slug="blogSlug"
            url="blogs"
            @media-deleted="fetchMedia"
          />
        </div>
      </div>
    </section>
  </CardWrapper>
</template>

<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useApi from '@/composables/useApi'
import MediaImg from '@/components/MediaImg/index.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const { get, post } = useApi()
const blogSlug = computed(() => route.params.slug)

// Store media items
const mediaItems = ref([])

// Computed property to filter out media items where main is true
const filteredMediaItems = computed(() => {
  return mediaItems.value.filter(media => !media.main)
})

// Fetch media function
const fetchMedia = async () => {
  try {
    const response = await get(`/blogs/${blogSlug.value}/medias`)
    mediaItems.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching media:', error)
    mediaItems.value = []
  }
}

// Handle file selection
const handleFileSelected = (file) => {
  console.log('File selected:', file)
}

// Form data for file upload
const form = reactive({
  mediaFile: []
})

// Handle file upload
const handleFileChanged = async () => {
  if (form.mediaFile.length > 0) {
    await uploadFiles()
  }
}

// Upload files to server
const uploadFiles = async () => {
  try {
    const formData = new FormData()
    form.mediaFile.forEach((file, index) => {
      formData.append(`images[${index}]`, file)
    })
    formData.append('blog_slug', blogSlug.value)
    const response = await post(`/blogs/${blogSlug.value}/medias`, formData)
    form.mediaFile = []
    await fetchMedia()
    console.log('Files uploaded successfully:', response)
  } catch (error) {
    console.error('Error uploading files:', error)
  }
}

onMounted(() => {
  fetchMedia()
})
</script>
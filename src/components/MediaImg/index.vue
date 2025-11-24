<template>
  <section>
    <div
      class="mx-2 rounded-lg border border-gray-200 shadow-sm media-img__container"
      style="width: 160px; height:160px;"
    >
      <!-- Debugging Placeholder -->
      <div v-if="!props.path" class="text-center p-4">
        <p>No image path provided</p>
      </div>
      <!-- Image -->
      <img
        v-else
        class="rounded-lg mb-2 media__img"
        :src="props.path"
        :alt="props.alt"
        @error="handleImageError"
      />
      
      <Image 
        name="media-trash.svg" 
        class="media-img__destroy" 
        @click="handleImgDelete" 
        v-if="$hasPermission('blogs-medias_delete') && deletable"
      />
    </div>
    
    <div
      class="media-seo__firing mx-2 my-2 d-flex justify-space-between"
      @click="showSeoDialog = true"
      v-if="$hasPermission('blogs-medias_edit')"
    >
      <span class="media-seo__firing__title font-size-18 font-weight-bold">
        {{ $t('media_crud.seo') }}
      </span>
      <Image name="media-plus.png" width="30px" />
    </div>
    
    <FormActions
      v-model="showSeoDialog"
      :id="props.id"
      :slug="props.slug"
      @close="closeSeoDialog"
      @submit="handleSeoSubmit"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormActions from '../FormActions/Media/index.vue'
import useApi from '@/composables/useApi'


const props = defineProps({
  path: {
    type: String,
    default: '/assets/images/fallback.jpg'
  },
  alt: {
    type: String,
    default: 'media image'
  },
  id: {
    type: [String, Number],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  deletable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['media-deleted', 'media-updated'])
const { remove } = useApi()
const showSeoDialog = ref(false)

const handleImgDelete = async () => {
  try {
    await remove(`/blogs/${props.slug}/medias/${props.id}`)
    emit('media-deleted')
    console.log('Delete successful for media ID:', props.id)
  } catch (error) {
    console.error('Error deleting media:', error)
  }
}

const handleImageError = () => {
  console.error('Failed to load image:', props.path)
}

const closeSeoDialog = () => {
  showSeoDialog.value = false
}

const handleSeoSubmit = (responseData) => {
  console.log('SEO data updated:', responseData)
  emit('media-updated', responseData)
  closeSeoDialog()
}
</script>
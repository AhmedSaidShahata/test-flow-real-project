

import { ref, nextTick } from 'vue'
import useApi from '../../../composables/useApi'
import { useRouter } from 'vue-router'

const { post, loadingPost } = useApi()



const previewFile = (file) => {
  preview.value = URL.createObjectURL(file)
}


export {
    post,
    loadingPost,
    previewFile
}
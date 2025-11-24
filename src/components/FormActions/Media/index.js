import { ref, nextTick } from "vue";
import useApi from "../../../composables/useApi";
import { useLocaleStore } from "@/stores/locale";

const url = "blogs";
const form = ref({
  title: "",
  description: "",
});
const renderForm = ref(true);
const id = ref("");
const { post, get, loadingPost } = useApi();

const formData = () => {
  const { localeValue } = useLocaleStore();
  const formData = new FormData();
  
  // Only append fields if they have values
  if (form.value.title && form.value.title.trim() !== "") {
    formData.append("meta_title", form.value.title.trim());
  }
  
  if (form.value.description && form.value.description.trim() !== "") {
    formData.append("alternative_text", form.value.description.trim());
  }
  
  formData.append("locale", localeValue.value);
  formData.append("_method", "put");
  return formData;
};

const fetchData = async (slug, mediaId) => {
  try {
    const response = await get(`/${url}/${slug}/medias/${mediaId}`);
    const mediaMeta = response.data.medium?.media_meta || {};
    form.value = {
      title: mediaMeta.meta_title || "",
      description: mediaMeta.alternative_text || "",
    };
    id.value = mediaId;
  } catch (error) {
    console.error('Error fetching media data:', error.response?.data || error);
    form.value = {
      title: "",
      description: "",
    };
    id.value = mediaId;
  }
};

const submited = async (emit, slug) => {
  try {
    const response = await post(`/${url}/${slug}/medias/${id.value}`, formData());
    
    // Emit submit event with response data
    emit("submit", response.data);
    
    // Emit close event
    emit("close");
    
    return response;
  } catch (error) {
    console.error("Error submitting form:", error.response?.data || error);
    throw error; // Re-throw to handle in component
  }
};

const resetForm = () => {
  form.value = {
    title: "",
    description: "",
  };
  id.value = "";
  renderForm.value = false;
  nextTick(() => {
    renderForm.value = true;
  });
};


export { 
  loadingPost, 
  formData, 
  get, 
  post, 
  submited, 
  renderForm, 
  form, 
  fetchData, 
  resetForm, 
  url, 
  id 
};
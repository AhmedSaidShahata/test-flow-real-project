import { ref, nextTick, defineEmits } from "vue";
import useApi from "@/composables/useApi";


const emit = defineEmits(["closed", "saved"]);

const url = "blog-categories";
const form = ref({
  groups: []
});

const { post, loadingPost, get } = useApi();



const moveItemUp = (index) => {
  if (index > 0) {
    const temp = form?.value?.groups[index];
    form?.value?.groups.splice(index, 1);
    form?.value?.groups.splice(index - 1, 0, temp);
  }
};

const moveItemDown = (index) => {
  if (index < form?.value?.groups.length - 1) {
    const temp = form?.value?.groups[index];
    form?.value?.groups.splice(index, 1);
    form?.value?.groups.splice(index + 1, 0, temp);
  }
};

const formData = () => {

  const formData = new FormData();
  form?.value?.groups.forEach((group, i) => {
    formData.append(`blog_categories[${i}]`, group.id);
  });
  return formData
};

const submited = async () => {
  let response;
  response = await post(`/${url}/sort`, formData());
  return response ;
};


const handleShow = async () => {
  const response = await get(`/${url}?pagination=all`);
  const categories = response?.data?.data;
  form.value.groups = categories || {};
};



export { moveItemUp, moveItemDown, post, get, loadingPost, submited, form, handleShow, formData, url };

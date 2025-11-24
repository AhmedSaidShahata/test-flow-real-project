import { ref } from "vue";
import useApi from "@/composables/useApi";
const { post, loadingPost } = useApi();

const form = ref({
  email: "",
  password: "",
});

const formData = () => {
  const formData = new FormData();
  formData.append("email", form.value.email);
  formData.append("password", form.value.password);
  return formData;
};

const submited = async () => {
  let response = await post("/signin", formData());
  if (response) {
    localStorage.setItem("_token", response?.data?.access_token);
    window.location.href = "/dashboard";
  }
};

export { post, form, submited, loadingPost, formData };
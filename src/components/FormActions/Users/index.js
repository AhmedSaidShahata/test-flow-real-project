import { ref, nextTick } from "vue";
import useApi from "../../../composables/useApi";
import { useRouter } from "vue-router";

const url = "users";
// let languages = ref([]);

const preview = ref(null); // Only if you need this for something else

const previewFile = (file) => {
  if (!file) return;
  
  // Update the form's image structure
  form.value.image = {
    path: URL.createObjectURL(file),
    file: file  // Store the actual file object for FormData
  };
}


let roles = ref([]);
const form = ref({
  firstname: "",
  lastname: "",
  role: 0,
  email: "",
  // language: null,
  password: "",
  phone: '',
  country_code: '00966',
  image: { path: null },
});
const renderForm = ref(true)
const isEdit = ref(false)
const id = ref('');
const { post, loadingPost, get } = useApi();
const router = useRouter();

const formData = () => {
  const formData = new FormData();

  if(!isEdit.value){
    formData.append("firstname", form.value.firstname);
    formData.append("lastname", form.value.lastname);
    formData.append("email", form.value.email);
    formData.append("role", form.value.role ?? '');
    // formData.append("language", form.value.language ?? '');

    formData.append('password', form.value.password);
    if (form.value.image?.file instanceof File) {
      formData.append("image", form.value.image.file);
    }

    if(form.value.phone){
      formData.append('phone[number]', form.value.phone ?? '');
      formData.append('phone[country_code]', form.value.country_code ?? '');
    }
  }

  if (isEdit.value) {
    formData.append("_method", "put");
    formData.append("role", form.value.role ?? '');
  }
  return formData;
};

const submited = async (router) => {
  let response;
  if (isEdit.value) {
    response = await post(`/${url}/${id.value}`, formData());
  } else {
    response = await post(`/${url}`, formData());
  }
  if (response) {
    router.push(`/${url}`);
  }


};

const handleShow = async (route) => {
  isEdit.value = !!route?.params?.id;
  id.value = route?.params?.id;
  if (isEdit.value) {
    const response = await get(`/${url}/${id.value}`);
    const user = response?.data?.user;
    
    form.value = {
      email: user?.email,
      country_code: user?.phone?.country_code,
      firstname: user?.firstname,
      lastname: user?.lastname,
      image: {
        path: user?.image ? user?.image?.path : '/assets/images/person-circle.svg',
        file: null
      },
      phone: user?.phone?.number,
      role: user?.role
    };
  }
};

// const getLanguages = async() =>{
//   const response = await get('/languages?pagination=all');
//    languages.value = response.data.data;
// }

const getRoles = async() =>{
  const response = await get('/roles?pagination=all');
   roles.value = response?.data?.data?.map(role => ({
  id: role.id,
  name: role.name
}));
}

const resetForm = () => {
  // Revoke any existing object URL
  if (form.value.image?.path && form.value.image.path.startsWith('blob:')) {
    URL.revokeObjectURL(form.value.image.path);
  }
  
  form.value = {
    firstname: "",
    lastname: "",
    role: 0,
    email: "",
    language: 0,
    password: "",
    phone: '',
    country_code: '00966',
    image: { path: null, file: null }
  }
  
  renderForm.value = false;
  nextTick(() => {
    renderForm.value = true;
  });
}

export { post, get, loadingPost, router, submited, id, renderForm, form, isEdit, handleShow, formData, resetForm, url, getRoles, roles,previewFile};

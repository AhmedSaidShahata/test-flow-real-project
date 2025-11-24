import { ref, nextTick } from "vue";
import useApi from "../../../composables/useApi";
import { useRouter } from "vue-router";
import { useLocaleStore } from "@/stores/locale";

const url = "roles";
const form = ref({
  name: "",
  description: "",
  permissions: [],
});
const loadData = ref(false);
const renderForm = ref(true);
const isEdit = ref(false);
const id = ref("");
const { post, loadingPost, get } = useApi();
const router = useRouter();

const formData = () => {
  const { localeValue } = useLocaleStore();
  const data = new FormData();
  
  
  data.append("name", form.value.name);
  data.append("description", form.value.description ?? '');

  if(isEdit.value){
    let permissionIndex = 0;
  form?.value?.permissions?.forEach(group => {
    group.permissions.forEach(permission => {
      if (permission.selected || permission.sub_permissions.some(sub => sub.selected)) {
        // Add permission ID
        data.append(`permissions[${permissionIndex}][id]`, permission.id);
        
        // Add selected sub-permissions
        permission.sub_permissions.forEach(sub => {
          if (sub.selected) {
            data.append(
              `permissions[${permissionIndex}][sub_permissions][]`, 
              sub.id
            );
          }
        });
        
        permissionIndex++;
      }
    });
    data.append("_method", "put");
    data.append("locale", localeValue.value);
  });
  }
  
  return data;
};

const submited = async (router) => {
  await nextTick();
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
    loadData.value = true;
    const response = await get(`/${url}/${id.value}`);
    const role = response?.data?.role;
    const newPermissions = JSON.parse(JSON.stringify(form.value.permissions));
    
    role?.permission_groups?.forEach(roleGroup => {
      const formGroup = newPermissions.find(g => g.id === roleGroup.id);
      if (formGroup) {
        roleGroup.permissions.forEach(rolePermission => {
          const formPermission = formGroup.permissions.find(p => p.id === rolePermission.id);
          if (formPermission) {
            formPermission.selected = rolePermission.selected;
            formPermission.sub_permissions.forEach(formSub => {
              const roleSub = rolePermission.sub_permissions.find(s => s.id === formSub.id);
              formSub.selected = roleSub?.selected || false;
            });
          }
        });
      }
    });
    
    form.value.permissions = newPermissions;
    form.value.name = role?.name;
    form.value.description = role?.description;
    loadData.value = false;
  }
};

const resetForm = () => {
  form.value = {
    name: "",
    description: "",
    permissions: [],
  };
};


const selectAllSubPermissions = (id) => {
  form.value.permissions.forEach((group) => {
    group.permissions.forEach((permission) => {
      if (permission.id === id) {
        permission.sub_permissions.forEach((sub) => {
          sub.selected = permission.selected;
        });
      }
    });
  });
};

const selectAll = (isSelected) => {
  form.value.permissions = form.value.permissions.map(group => ({
    ...group,
    permissions: group.permissions.map(permission => ({
      ...permission,
      selected: isSelected,
      sub_permissions: permission.sub_permissions.map(sub => ({
        ...sub,
        selected: isSelected
      }))
    }))
  }));
};
const selectMainPermission = () => {
  form.value.permissions.forEach((group) => {
    group.permissions.forEach((permission) => {
      permission.selected = permission.sub_permissions.every((sub) => sub.selected);
    });
  });
};

const resetPermissions = () => {
  form.value.permissions.forEach((group) => {
    group.permissions.forEach((permission) => {
      permission.selected = false;
      permission.sub_permissions.forEach((sub) => {
        sub.selected = false;
      });
    });
  });
};


const getAllPermissions = async () => {
  try {
    loadData.value = true;
    const { data } = await get("/permissions?pagination=all");

    const newPermissions = data.data.reduce((acc, permission) => {
      const groupId = permission.group.id;
      let group = acc.find(g => g.id === groupId);
      
      if (!group) {
        group = {
          id: groupId,
          name: permission.group.name,
          permissions: []
        };
        acc.push(group);
      }

      group.permissions.push({
        id: permission.id,
        name: permission.name,
        selected: false,
        sub_permissions: permission.sub_permissions.map(sub => ({
          ...sub,
          selected: false
        }))
      });

      return acc;
    }, []);

    form.value.permissions = newPermissions;
    
  } catch (error) {
    form.value.permissions = []; 
  }
};

export {
  post,
  get,
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
  selectAllSubPermissions,
  selectAll,
  selectMainPermission,
  resetPermissions,
  getAllPermissions,
  loadData
};

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "@/composables/useApi";

const { get } = useApi();

import { useRoute, useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const route = useRoute();
  const user = ref(null)

  async function logout() {
    localStorage.removeItem("_token")
    user.value = null;
  }

  async function getUser() {
    try {
      const data = await get("/profile");
      let userData = data.data?.user
      user.value = userData;
      // checkPermission(userData)
      
    } catch (error) {
      console.log(error)
    }
  }

  function checkPermission(userData) {
    const userPermissions = userData.user?.role?.permissions
      .map((permission) =>
        permission.sub_permissions.map(
          (subPermission) =>
            subPermission.name.replaceAll(/[/ ]+/g, "-").toLowerCase()
        )
      )
      .flat();
    userPermissions?.push('dashboard')
    if (route?.meta?.permissions && !userPermissions?.includes(route?.meta?.permissions)) {
      router.push('/not-found')
    }
  }


  return { user, getUser, logout }
})

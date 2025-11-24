import { useAuthStore } from "@/stores/auth"
export default {
  methods: {
    $dateFormat(date) {
      if (!date) return
      return new Date(date).toLocaleString(this.$i18n.locale)
    },
    $textTruncate: (value, count = 20) => {
      if (value && value.length > count) {
        return value.substring(0, count) + "...";
      } else {
        return value;
      }
    },
    $hasPermission(permissionValidate) {

      const userData = useAuthStore().user

      const userPermissions = userData?.role?.permissions
        .map((permission) =>
          permission.sub_permissions.map(
            (subPermission) =>
              subPermission.name.replaceAll(/[/ ]+/g, "-").toLowerCase()
          )
        )
        .flat();




      userPermissions?.push('dashboard')


      if (Array.isArray(permissionValidate)) {
        return permissionValidate.some(permission =>
          userPermissions?.includes(permission)
        );
      } else {
       return userPermissions?.includes(permissionValidate);
      }

      // return true


    }
  }
}
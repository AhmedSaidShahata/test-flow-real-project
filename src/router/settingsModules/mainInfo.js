export const mainInfoRoutes = {
  path: ":id",
  component: () => import('@/views/settings/all-settings/main-info/record/index.vue'),
  meta: {
      permissions : "settings_mainInfo",
      title : "main_informations_setting",
  }
}

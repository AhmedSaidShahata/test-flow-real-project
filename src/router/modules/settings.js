import { asyncSettingRoutes } from "@/router/settingsRoutes"

const settingsRoutes = {
  title: 'settings',
  path: '/settings',
  meta: {
    icon: 'settings.svg',
    permissions: [
      'project-setting-groups_view',
      'project-setting-types_view',
      'project-setting-groups-project-setting-sections_view',
      'project-setting-groups-project-setting-sections-project-settings_view'
    ],
    hidden: false
  },
  children: [
    // {
    //   title: 'countries',
    //   path: '/',
    //   component: () => import('@/views/settings/countries/index.vue'),
    //   meta: {
    //     to: '/countries',
    //     // icon: 'countries.svg',
    //     showChildren: false,
    //     permissions: 'countries_view'
    //   },
    //   children: [
    //     {
    //       title: 'countries',
    //       path: '/countries',
    //       // component: () => import(''),
    //       meta: {
    //         // icon: 'countries.svg',
    //         permissions: 'countries_view'
    //       }
    //     }
    //   ]
    // },
    // {
    //   title: 'currencies',
    //   path: '/',
    //   component: () => import('@/views/settings/currencies/index.vue'),
    //   meta: {
    //     to: '/currencies',
    //     // icon: 'currencies.svg',
    //     showChildren: false,
    //     permissions: 'currencies_view'
    //   },
    //   children: [
    //     {
    //       title: 'currencies',
    //       path: '/currencies',
    //       // component: () => import(''),
    //       meta: {
    //         // icon: 'currencies.svg',
    //         permissions: 'currencies_view'
    //       }
    //     }
    //   ]
    // },
    {
      title: 'all-settings',
      path: 'main_informations',
      component: () => import('@/layouts/settingLayout/index.vue'),
      meta: {
        to: '/settings/main_informations',
        icon: 'settings.svg',
        showChildren: false,
        permissions: [
          'project-setting-groups_view',
        ]
      },
        children: [...asyncSettingRoutes]
    }
  ]
}

export default settingsRoutes

const providersRoutes = {
  title: 'service-providers',
  path: '/',
  component: () => import("@/views/providers/index.vue"),
  meta: {
    to: "/providers",
    icon: 'providers-white.svg',
    permissions: 'providers_view',
    hideChildren: true,
  },
  children: [
    {
      path: 'providers',
      component: () => import('@/views/providers/record/index.vue'),
      meta: {
        permissions: 'providers_view'
      }
    },
    {
      path: 'providers/create',
      component: () => import('@/views/providers/actions/index.vue'),
      meta: {
        permissions: 'providers_create'
      }
    },
    {
      path: 'providers/:id/edit',
      component: () => import('@/views/providers/actions/index.vue'),
      meta: {
        permissions: 'providers_edit'
      }
    }
  ]
}
export default providersRoutes

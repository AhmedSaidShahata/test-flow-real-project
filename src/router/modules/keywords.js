const keywordsRoutes = {
  title: 'keywords',
  path: '/',
  component: () => import("@/views/keywords/index.vue"),
  meta: {
    to: "/keywords",
    icon: 'keywords-sidebar.svg',
    permissions: 'keywords_view',
    hideChildren: true,
  },
  children: [
    {
      path: 'keywords',
      component: () => import('@/views/keywords/record/index.vue'),
      meta: {
        permissions: 'keywords_view'
      }
    },
    {
      path: 'keywords/create',
      component: () => import('@/views/keywords/actions/index.vue'),
      meta: {
        permissions: 'keywords_create'
      }
    },
    {
      path: 'keywords/:id/edit',
      component: () => import('@/views/keywords/actions/index.vue'),
      meta: {
        permissions: 'keywords_edit'
      }
    }
  ]
}
export default keywordsRoutes

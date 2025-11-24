const affiliateRoutes = {
  title: 'affiliates',
  path: '/affiliates',
  meta: {
    icon: 'affiliates-sidebar.svg',
    permissions: 'affiliates_view',
    hidden: false
  },
  children: [
    {
      title: 'all_affiliates',
      path: '/',
      component: () => import('@/views/affiliates/index.vue'),
      meta: {
        to: '/affiliates',
        icon: 'dashboard.svg',
        showChildren: false,
        permissions: 'affiliates_view'
      },
      children: [
        {
          title: 'all_affiliates',
          path: '/affiliates',
          component: () => import('@/views/affiliates/record/index.vue'),
          meta: {
            icon: 'dashboard.svg',
            permissions: 'affiliates_view'
          }
        }
      ]
    }
  ]
}
export default affiliateRoutes
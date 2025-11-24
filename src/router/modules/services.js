const servicesRoutes = {
  title: 'services',
  path: '/services',
  meta: {
    icon: 'services.svg',
    // permissions: [], // Not in API yet
    hidden: false
  },
  children: [
    {
      title: 'services-sections',
      path: '/',
      component: () => import('@/views/services/sections/index.vue'),
      meta: {
        to: '/services-sections',
        // icon: 'services-sections.svg',
        showChildren: false,
        // permissions: ''
      },
      children: [
        // CRUD routes here.
      
      ]
    },
    {
      title: 'packages',
      path: '/',
      component: () => import('@/views/services/packages/index.vue'),
      meta: {
        to: '/packages',
        // icon: 'packages.svg',
        showChildren: false,
        // permissions: ''
      },
      children: [
        // CRUD Here
        
      ]
    }
  ]
}
export default servicesRoutes

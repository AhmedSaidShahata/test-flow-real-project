const pagesRoutes = {
  title: 'pages-content',
  path: '/',
  component: () => import('@/views/pages/index.vue'),
  meta: {
    to: '/pages',
    icon: 'pages.svg',
    permissions: 'pages_view',
    hideChildren: true
  },
  children: [
    {
      path: 'pages',
      component: () => import('@/views/pages/record/index.vue'),
      meta: {
        permissions: 'pages_view'
      }
    },
    {
      path: 'pages/:path/edit',
      component: () => import('@/views/pages/actions/index.vue'),
      meta: {
        permissions: 'pages_edit'
      }
    },
    {
      path: 'pages/:path/sections',
      component: () => import('@/views/pages/sections/record/index.vue'),
      meta: {
        permissions: 'pages_view'
      }
    },
    {
      path: 'pages/:path/sections/:identifier/edit',
      component: () => import('@/views/pages/sections/actions/index.vue'),
      meta: {
        permissions: 'pages_edit'
      }
    },
    //items routes
    {
      path: 'pages/:path/sections/:identifier/section-items',
      component: () => import('@/views/pages/sections/items/record/index.vue'),
      meta: {
        permissions: 'pages_view'
      }
    },
    {
      path: 'pages/:path/sections/:identifier/section-items/:itemIdentifier/edit',
      component: () => import('@/views/pages/sections/items/actions/index.vue'),
      meta: {
        permissions: 'pages_edit'
      }
    },
    //custom item attributes routes
    {
      path: 'pages/:path/sections/:identifier/section-items/:itemIdentifier/custom-attributes',
      component: () => import('@/views/pages/sections/items/custom-attributes/record/index.vue'),
      meta: {
        permissions: 'pages_view'
      }
    },
    {
      path: 'pages/:path/sections/:identifier/section-items/:itemIdentifier/custom-attributes/:attributeKey/edit',
      component: () => import('@/views/pages/sections/items/custom-attributes/actions/index.vue'),
      meta: {
        permissions: 'pages_edit'
      }
    },

        //section custom attributes routes
    {
      path: 'pages/:path/sections/:identifier/custom-attributes',
      component: () => import('@/views/pages/sections/custom-attributes/record/index.vue'),
      meta: {
        permissions: 'pages_view'
      }
    },
    {
      path: 'pages/:path/sections/:identifier/custom-attributes/:attributeKey/edit',
      component: () => import('@/views/pages/sections/custom-attributes/actions/index.vue'),
      meta: {
        permissions: 'pages_edit'
      }
    },
    
        {
      path: 'pages/:path/keywords',
      component: () => import('@/views/pages/keywords/index.vue'),
      meta: {
        permissions: 'pages-keywords_view'
      }
    }
  ]
}

export default pagesRoutes

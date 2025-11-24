const blogsRoutes = {
  title: 'blog',
  path: '/blog',
  meta: {
    icon: 'blogs.svg',
    permissions: ['blogs_view', 'blog-categories_view', 'tags_view'],
    hidden: false
  },
  children: [
    {
      title: 'tags',
      path: '/',
      component: () => import('@/views/blogs/tags/index.vue'),
      meta: {
        to: '/tags',
        icon: 'dashboard.svg',
        showChildren: false,
        permissions: 'tags_view'
      },
      children: [
        {
          title: 'tags',
          path: '/tags',
          component: () => import('@/views/blogs/tags/record/index.vue'),
          meta: {
            icon: 'dashboard.svg',
            permissions: 'tags_view'
          }
        },
        {
          path: 'tags/create',
          component: () => import('@/views/blogs/tags/actions/index.vue'),
          meta: {
            permissions: 'tags_create'
          }
        },
        {
          path: 'tags/:id/edit',
          component: () => import('@/views/blogs/tags/actions/index.vue'),
          meta: {
            permissions: 'tags_edit'
          }
        }
      ]
    },
    {
      title: 'blog-categories',
      path: '/',
      component: () => import('@/views/blogs/categories/index.vue'),
      meta: {
        to: '/blog-categories',
        // icon: 'categories.svg',
        showChildren: false,
        permissions: 'blog-categories_view'
      },
      children: [
        {
          title: 'blog-categories',
          path: '/blog-categories',
          component: () => import('@/views/blogs/categories/record/index.vue'),
          meta: {
            icon: 'dashboard.svg',
            permissions: 'blog-categories_view'
          }
        },
        {
          path: 'blog-categories/create',
          component: () => import('@/views/blogs/categories/actions/index.vue'),
          meta: {
            permissions: 'blog-categories_create'
          }
        },
        {
          path: 'blog-categories/:id/edit',
          component: () => import('@/views/blogs/categories/actions/index.vue'),
          meta: {
            permissions: 'blog-categories_edit'
          }
        }
      ]
    },
    {
      title: 'blogs-content', // simply Blogs in postman
      path: '/',
      component: () => import('@/views/blogs/blogs-content/index.vue'),
      meta: {
        to: '/blogs',
        icon: 'blogs.svg',
        showChildren: false,
        permissions: 'blogs_view'
      },
      children: [
        {
          title: 'blogs-content',
          path: '/blogs',
          component: () => import('@/views/blogs/blogs-content/record/index.vue'),
          meta: {
            icon: 'blogs.svg',
            permissions: 'blogs_view'
          }
        },
        {
          path: 'blogs/create',
          component: () => import('@/views/blogs/blogs-content/actions/index.vue'),
          meta: {
            permissions: 'blogs_create'
          }
        },
        {
          path: 'blogs/:id/edit',
          component: () => import('@/views/blogs/blogs-content/actions/index.vue'),

          meta: {
            permissions: 'blogs_edit'
          }
        },
        {
          path: 'blogs/:slug/media',
          component: () => import('@/views/blogs/blogs-content/media/index.vue'),
          meta: {
            permissions: 'blogs_edit'
          }
        }
      ]
    }
  ]
}
export default blogsRoutes

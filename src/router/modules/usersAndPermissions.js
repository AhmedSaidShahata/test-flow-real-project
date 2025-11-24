const usersAndPermissionsRoutes = {
  title: 'users-and-permissions',
  path: '/users-and-permissions',
  meta: {
    icon: 'users.svg',
    permissions: ['users_view', 'roles_view'],
    hidden: false
  },
  children: [
    {
      title: 'users',
      path: '/',
      component: () => import('@/views/users-and-permissions/users/index.vue'),
      meta: {
        to: '/users',
        icon: 'users.svg',
        showChildren: false,
        permissions: 'users_view'
      },
      children: [
        // CRUD routes here.
        {
          title: 'users',
          path: '/users',
          component: () => import('@/views/users-and-permissions/users/record/index.vue'),
          meta: {
            icon: 'users.svg',
            permissions: 'users_view'
          }
        },
        {
          path: '/users/create',
          component: () => import('@/views/users-and-permissions/users/actions/index.vue'),
          meta: {
            permissions: 'users_create'
          }
        },
        {
          path: 'users/:id/edit',
          component: () => import('@/views/users-and-permissions/users/actions/index.vue'),
          meta: {
            permissions: 'users'
          }
        }
      ]
    },
    {
      title: 'roles',
      path: '/',
      component: () => import('@/views/users-and-permissions/roles/index.vue'),
      meta: {
        to: '/roles',
        icon: 'users.svg',
        showChildren: false,
        permissions: 'roles_view'
      },
      children: [
        // CRUD Here
        {
          title: 'roles',
          path: '/roles',
          component: () => import('@/views/users-and-permissions/roles/record/index.vue'),
          meta: {
            icon: 'roles.svg',
            permissions: 'roles_view'
          }
        },
        {
          path: '/roles/create',
          component: () => import('@/views/users-and-permissions/roles/actions/index.vue'),
          meta: {
            permissions: 'roles_create'
          }
        },
        {
          path: 'roles/:id/edit',
          component: () => import('@/views/users-and-permissions/roles/actions/index.vue'),
          meta: {
            permissions: 'roles_edit'
          }
        }
      ]
    }
  ]
}
export default usersAndPermissionsRoutes

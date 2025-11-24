const contactRoutes = {
  title: 'contacts',
  path: '/contacts',
  meta: {
    icon: 'contact.svg',
    permissions: ['contact-topics_view', 'contact-messages_view' , 'refund-forms_view' ,'subscribers_view'],
    hidden: false
  },
  children: [
    {
      title: 'contact-topics',
      path: '/',
      component: () => import('@/views/contacts/contact-topics/index.vue'),
      meta: {
        to: '/contact-topics',
        icon: 'dashboard.svg',
        showChildren: false,
        permissions: 'contact-topics_view'
      },
      children: [
        {
          title: 'contact-topics',
          path: '/contact-topics',
          component: () => import('@/views/contacts/contact-topics/record/index.vue'),
          meta: {
            icon: 'dashboard.svg',
            permissions: 'contact-topics_view'
          }
        },
        {
          path: 'contact-topics/create',
          component: () => import('@/views/contacts/contact-topics/actions/index.vue'),
          meta: {
            permissions: 'contact-topics_create'
          }
        },
        {
          path: 'contact-topics/:id/edit',
          component: () => import('@/views/contacts/contact-topics/actions/index.vue'),
          meta: {
            permissions: 'contact-topics_edit'
          }
        }
      ]
    },
    {
      title: 'contact-msgs',
      path: '/',
      component: () => import('@/views/contacts/messages/index.vue'),
      meta: {
        to: '/messages',
        icon: 'dashboard.svg',
        showChildren: false,
        permissions: 'contact-messages_view'
      },
      children: [
        {
          title: 'messages',
          path: '/messages',
          component: () => import('@/views/contacts/messages/record/index.vue'),
          meta: {
            icon: 'dashboard.svg',
            permissions: 'contact-messages_view'
          }
        }
      ]
    },
    {
      title: 'subscribers',
      path: '/',
      component: () => import('@/views/contacts/subscription/index.vue'),
      meta: {
        to: '/subscription-messages',
        icon: 'dashboard.svg',
        showChildren: false,
        permissions: 'subscribers_view'
      },
      children: [
        {
          title: 'subscribers',
          path: '/subscription-messages',
          component: () => import('@/views/contacts/subscription/record/index.vue'),
          meta: {
            icon: 'dashboard.svg',
            permissions: 'subscribers_view'
          }
        }
      ]
    },
     {
      title: 'refund-forms',
      path: '/',
      component: () => import('@/views/contacts/refund-forms/index.vue'),
      meta: {
        to: '/refund-forms',
        icon: 'dashboard.svg',
        showChildren: false,
        permissions: 'refund-forms_view'
      },
      children: [
        {
          title: 'refund-forms',
          path: '/refund-forms',
          component: () => import('@/views/contacts/refund-forms/record/index.vue'),
          meta: {
            icon: 'dashboard.svg',
            permissions: 'refund-forms_view'
          }
        }
      ]
    }
  ]
}
export default contactRoutes

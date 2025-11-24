const reviewsRoutes = {
  title: 'reviews',
  path: '/',
  component: () => import("@/views/reviews/index.vue"),
  meta: {
    to: "/customer-reviews",
    icon: 'reviews.png',
    permissions: 'customer-reviews_view',
    hideChildren: true,
  },
  children: [
    {
      path: 'customer-reviews',
      component: () => import('@/views/reviews/record/index.vue'),
      meta: {
        permissions: 'customer-reviews_view'
      }
    },
    {
      path: 'customer-reviews/create',
      component: () => import('@/views/reviews/actions/index.vue'),
      meta: {
        permissions: 'customer-reviews_create'
      }
    },
    {
      path: 'customer-reviews/:id/edit',
      component: () => import('@/views/reviews/actions/index.vue'),
      meta: {
        permissions: 'customer-reviews_edit'
      }
    }
  ]
}
export default reviewsRoutes

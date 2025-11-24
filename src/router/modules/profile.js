const profileRoutes = {
  path: '/profile',
  component: () => import('@/views/profile/index.vue'),
  name: 'profile',
  meta: {
    title: 'profile'
  }
}
export default profileRoutes

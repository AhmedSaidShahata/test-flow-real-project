const dashboardRoutes = {
  title: 'dashboard',
  path: '/dashboard',
  component: () => import("@/views/dashboard/index.vue"),
  meta: {
    to: "/dashboard",
    icon: 'house.svg',
    permissions: 'dashboard',
  }
}
export default dashboardRoutes
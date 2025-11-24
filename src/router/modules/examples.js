const examplesRoutes = {
  title: 'examples',
  path: '/examples',
  component: () => import("@/views/examples/index.vue"),
  meta: {
    to: "/examples",
    icon: 'house.svg',
    permissions: 'dashboard',
    hidden:true
  }
}
export default examplesRoutes
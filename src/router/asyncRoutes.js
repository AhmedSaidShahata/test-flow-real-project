import contactRoutes from './modules/contact.js'
import profileRoutes from './modules/profile.js'
import settingsRoutes from './modules/settings.js'
import dashboardRoutes from './modules/dashboard.js'
import blogsRoutes from './modules/blogs.js'
import pagesRoutes from './modules/pages.js'
import keywordsRoutes from './modules/keywords.js'
import servicesRoutes from './modules/services.js'
import providersRoutes from './modules/providers.js'
import usersAndPermissionsRoutes from './modules/usersAndPermissions.js'
import reviewsRoutes from './modules/reviews.js'
import affiliatesRoutes from './modules/affiliates.js'

import examples from './modules/examples.js'
const asyncRoutes = [
  dashboardRoutes,
  usersAndPermissionsRoutes,
  blogsRoutes,
  providersRoutes,
  contactRoutes,
  keywordsRoutes,
  servicesRoutes,
  settingsRoutes,
  pagesRoutes,
  profileRoutes,
  reviewsRoutes,
  affiliatesRoutes,
  examples
]

export default asyncRoutes

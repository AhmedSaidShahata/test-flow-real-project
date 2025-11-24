const modules = import.meta.glob('./settingsModules/*.js', { eager: true })

const asyncSettingRoutes = []

Object.entries(modules).forEach(([path, mod]) => {
  const fileName = path.match(/\.\/settingsModules\/(.*)\.js$/)[1]
  asyncSettingRoutes.push(mod[fileName + 'Routes'])
})

asyncSettingRoutes.sort((a, b) => (a.order || 0) - (b.order || 0))

export { asyncSettingRoutes }

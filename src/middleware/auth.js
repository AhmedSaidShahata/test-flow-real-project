export default function auth(router) {
  const unAuthPaths = [
    "/login"
  ];

  const isAuthenticated = localStorage.getItem("_token");

  router.beforeEach((to, from, next) => {
    const isUnAuthPath = unAuthPaths.includes(to.path);
    if (isAuthenticated && isUnAuthPath) {
      next("/dashboard");
    } else if (!isAuthenticated && !isUnAuthPath) {
      next("/login");
    }
    else {
      next();
    }
  });
}


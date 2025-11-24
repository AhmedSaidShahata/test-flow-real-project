const base = function () {
  const env = import.meta.env;
  if (env.MODE === "production") {
    return env.VITE_APP_ADMIN_PRODUCTION
  } else if (env.MODE === "dproduction") {
    return env.VITE_APP_ADMIN_DPRODUCTION;
  } else if (env.MODE === "tproduction") {
    return env.VITE_APP_ADMIN_TPRODUCTION;
  }else if (env.MODE === "int") {
    return env.VITE_APP_ADMIN_INT;
  }else if (env.MODE === "dev") {
    return env.VITE_APP_ADMIN_DEV;
  } else if (env.MODE === "testing") {
    return env.VITE_APP_ADMIN_TEST;
  } else if (env.MODE === "beta") {
    return env.VITE_APP_ADMIN_BETA;
  }
  else {
    return env.VITE_APP_ADMIN_DEV;
  }
};
export const baseURL = base();


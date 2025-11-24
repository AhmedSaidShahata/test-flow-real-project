import axios from 'axios';
import { baseURL } from "./baseUrl"
import { useLocaleCurrentAppStore } from "@/stores/localeCurrentApp";
import cookies from 'js-cookie';
import { useNotificationStore } from "@/stores/notification";
import { useErrorsStore } from "@/stores/errors";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const getSystemTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

api.interceptors.request.use(
  (config) => {
    const { localeCurrentAppValue } = useLocaleCurrentAppStore();
    let locale = cookies.get('lang')
    config.headers.Authorization = `Bearer ${localStorage.getItem('_token')}`;

    config.headers["X-locale"] = localeCurrentAppValue?.value || locale;
    config.headers['X-timezone'] = getSystemTimezone();
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(

  (response) => {
    const notificationStore = useNotificationStore();


    if (response.data?.message) {
      notificationStore.setNotification({ visible: true, text: response.data?.message, color: 'success' });
    }
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem("_token")
      window.location.href = '/login'
    }
    if ([422, 409].includes(error.response.status)) {
      const errorsStore = useErrorsStore();
      const notificationStore = useNotificationStore();
      errorsStore.setErrors(error.response.data.errors)
      let errorMsg = error.response.data?.message
      let textMsgNotification;
      if (errorMsg) {
       textMsgNotification=  errorMsg?.replace(/\([^)]*\)/g, "")?.trim();
      }

      notificationStore.setNotification({ visible: true, text: textMsgNotification, color: 'error' });
    }
    return Promise.reject(error);
  }
);

export default api;

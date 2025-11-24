import { ref } from "vue";
import axios from "@/plugins/axios";

export default () => {
  const errorsResponse = ref({});
  const loadingGet = ref(false);
  const loadingPost = ref(false);
  const loadingPut = ref(false);
  const loadingPatch = ref(false);
  const loadingRemove = ref(false);

  const handleRequest = async (request, loadingRef) => {
    loadingRef.value = true;
    errorsResponse.value = {};
    try {
      const result = await request();
      return result;
    } catch (error) {
      errorsResponse.value = error.response?.data?.errors || {};
      throw error;
    } finally {
      loadingRef.value = false;
    }
  };

  const get = (url, params = null) => {
    return handleRequest(() => axios.get(url, { params }), loadingGet);
  };

  const post = (url, data) => {
    return handleRequest(() => axios.post(url, data), loadingPost);
  };

  const put = (url, data) => {
    return handleRequest(() => axios.put(url, data), loadingPut);
  };

  const patch = (url, data) => {
    return handleRequest(() => axios.patch(url, data), loadingPatch);
  };

  const remove = (url) => {
    return handleRequest(() => axios.delete(url), loadingRemove);
  };

  return {
    errorsResponse,
    loadingGet,
    loadingPost,
    loadingPut,
    loadingPatch,
    loadingRemove,
    get,
    post,
    put,
    patch,
    remove,
  };
};

import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export function useIsEdit(paramKey = 'id') {
  const route = useRoute();
  const isEdit = ref(false);

  watch(
    () => route.params[paramKey],
    (paramValue) => {
      isEdit.value = !!paramValue;
    },
    { immediate: true }
  );

  return { isEdit };
}

<template>
  <v-switch inset class="switch-toggle" hideDetails :loading="loadingPut" @update:modelValue="updateVisibility" />
</template>

<script setup>
import useApi from "@/composables/useApi";
const { put, loadingPut, errorsResponse } = useApi();

const props = defineProps(["url", "name", "id"]);

const updateVisibility = async (value) => {
  let response = await put(`/${props.url}/${props.id}`, {
    [props.name]: value,
    locale: localStorage.getItem("lang"),
  });
};
</script>

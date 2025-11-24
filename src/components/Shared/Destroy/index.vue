<template>
  <v-dialog c max-width="500" class="destroy custom-dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <Image class="cursor-pointer ms-1" v-bind="activatorProps" name="trash.svg" />
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="rounded-xl py-5">
        <v-card-title class="text-center text-wrap font-weight-black mb-0">
          <div>
            <Image width="35px" class="mb-4" :name="icon" />
          </div>
          {{ $t(`${title}`) }}
        </v-card-title>
        <v-card-text class="text-center mt-n3">
          {{ $t(`${description}`) }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end w-100 me-7">
            <Button
              class="mx-1 text-primary font-weight-bold bg-transparent"
              :loading="loadingRemove"
              @click="deleteItem"
            >
              <span class="font-size-17">
                {{ $t("example.confirm") }}
              </span>
            </Button>
            <Button
              class="mx-1 text-primary font-weight-bold bg-transparent"
              @click="isActive.value = false"
            >
              <span class="text-error font-size-17">
                {{ $t("example.cancel") }}
              </span>
            </Button>
          </div>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import useApi from "@/composables/useApi";
import { inject } from "vue";
const emitter = inject("emitter");
const { remove, loadingRemove } = useApi();
const props = defineProps({
  url: String,
  id: [String, Number],
  icon: {
    type: String,
    default: "delete_trash.svg",
  },
  title: {
    default: "example.delete_tourism_package",
  },
  description: {
    default: "example.delete_tourism_package_description",
  },
});

const emit = defineEmits(["destroyItem"]);

const deleteItem = async () => {
  await remove(`/${props.url}/${props.id}`);
  emitter.emit("reload-data");
};
</script>

<template>
  <v-dialog max-width="500" class="destroy custom-dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <Image class="cursor-pointer mx-3" width="32" v-bind="activatorProps" :name="outerIcon" />
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
              :loading="loading"
              @click="handleDelete(isActive)"
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
const props = defineProps({
  deleteFunction: {
    type: Function,
    required: true
  },
  
  loading: {
    type: Boolean,
    default: false
  },
  
  icon: {
    type: String,
    default: "delete_trash.svg",
  },
  outerIcon: {
    type: String,
    default: "trash.svg",
  },
  
  title: {
    type: String,
    default: "example.delete_item",
  },
  description: {
    type: String,
    default: "example.delete_item_description",
  },
});

const emit = defineEmits(["deleted"]);

const handleDelete = async (isActive) => {
  try {
    await props.deleteFunction();
    
    isActive.value = false;
    
    emit("deleted");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
</script>
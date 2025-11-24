<template>
  <v-container fluid v-if="setting_groups.length" class="bg-white rounded-lg mt-2 ms-0 ms-lg-n6">
    <HeadingPage
        icon="CirclesFour.svg"
        title="settings_crud.record.title"
        description="settings_crud.record.description"
        class="mb-2"
      />
    <v-row class="pa-0">

       <v-col cols="12" lg="3" class="pt-6 rounded-lg ms-lg-n3 ms-2">
        <div class="bg-primary-50 rounded-lg px-3 py-1 ms-n4">
          <v-sheet class="mt-2 mb-n2" :class="[ locale.value === 'ar' ? 'rounded-s-lg' : 'rounded-e-lg' ]">
            <v-list dense class="bg-white py-0 mb-4 px-0" :class="[ locale.value === 'ar' ? 'rounded-s-lg' : 'rounded-e-lg' ]">
              <v-list-item
                v-for="(item, i) in setting_groups"
                :key="i"
                :to="`/settings/main_informations/${item.slug}`"
                :class="[
                  isActive(item.slug) ? 'bg-primary text-white' : 'text-primary',
                  isActive(item.slug)
                    ? (locale.value === 'ar' ? 'rounded-s-lg' : 'rounded-e-lg')
                    : ''
                ]"
              >
                <v-list-item-title class="font-size-16 font-weight-bold text-wrap pb-1">{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </div>
      </v-col>

      <v-col cols="12" lg="9" class="pt-6 ps-3 px-0 ms-lg-0 ms-n2">
        <v-toolbar flat class="bg-primary-50  rounded-lg" height="70">
          <div class="d-flex flex-column pa-3">
            <v-toolbar-title class="font-weight-bold font-size-18">{{ select_group?.name }}</v-toolbar-title>
            <span class="font-size-14 mt-1">{{ select_group?.description }}</span>
          </div>
        </v-toolbar>
        <v-card class="mt-4" elevation="0">
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed,watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useApi from "@/composables/useApi";

const { locale } = useI18n();

const setting_groups = ref([]);
const select_group = ref({});
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const { get } = useApi();

const handleShow = async () => {
  try {
    const res = await get('project-setting-groups');
    const data = res.data.data;
    setting_groups.value = data;
    select_group.value = data[0];
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleShow();
});

const currentPath = computed(() => {
  const path = route.path.split('/');
  return path[path.length - 1];
});

const isActive = (slug) => {
  return currentPath.value === slug;
};


watch(
  [currentPath, () => setting_groups.value], // Watch both path and groups
  ([newSlug, groups]) => {
    if (groups.length === 0) return; // Wait for groups to load
    
    const found = groups.find((item) => item.slug === newSlug);
    if (found) {
      select_group.value = found;
    } else if (newSlug && groups.length) {
      // Invalid slug, redirect to first group
      router.replace(`/settings/main_informations/${groups[0].slug}`);
    }
  },
  { immediate: true }
);
</script>

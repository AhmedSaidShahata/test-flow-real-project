<template>
  <v-navigation-drawer
    class="sidebar sidebar--gradient rounded-b-xl"
    v-model="drawerResult"
    app
    :location="location"
  >
    <v-list v-model:opened="opened">
      <v-list-item class="mb-3 pa-4">
        <v-row>
          <v-col class="d-flex align-center flex-column justify-center">
            <h1 class="my-0 py-0 font-weight-medium text-white font-din">SAFR APP</h1>
            <h1 class="my-0 py-0 mt-n4 font-weight-medium text-white font-din">
              سفـــــر آب
            </h1>
          </v-col>
        </v-row>
      </v-list-item>
      <v-list-group
        :class="`${isRouteActive(parent) ? 'route-active' : ''} `"
        :value="parent.meta.to"
        v-for="parent in asyncRoutes"
        :key="parent.to"
        class="mb-4"
      >
        <template
          v-if="!parent.meta.hidden && $hasPermission(parent.meta.permissions)"
          v-slot:activator="{ props }"
        >
          <v-list-item
            :class="`${
              $route.path?.includes(parent.meta.to) ? 'active-gradient ' : ' '
            } ${!parent.children || parent.meta.hideChildren ? 'remove-arrow' : ''}`"
            class="mx-0 px-0 position-relative"
            v-bind="props"
            @click="
              !parent.children || parent.meta.hideChildren
                ? $router.push(parent.meta.to)
                : ''
            "
          >
            <template v-slot:prepend>
              <Image
                v-if="$route.path?.includes(parent.meta.to) || isRouteActive(parent)"
                name="active-item.svg"
                class="active-icon position-absolute"
              />
              <Image
                v-if="parent?.meta?.icon"
                :name="parent?.meta?.icon"
                :class="`route-icon ${parent.title} ms-4 me-2`"
                
              />
            </template>

            <span v-if="parent.title" class="mx-1 mt-n2 font-size-13">
              {{ $t(parent.title) }}
            </span>
            <template v-slot:append>
              <Image class="sidebar__dropdown-icon me-2" name="arrow-down-active.svg" />
            </template>
          </v-list-item>
        </template>
        <v-list-group class="px-1" v-for="child in parent.children" :key="child.to">
          <template
            v-if="
              !child.meta.hidden &&
              $hasPermission(child.meta.permissions) &&
              !parent.meta.hideChildren
            "
            v-slot:activator="{  }"
          >
            <v-list-item
              :class="`${
                $route.path?.includes(child.meta.to) ? 'bg-white text-primary' : ' '
              } ${!child.meta.showChildren ? 'remove-arrow' : ''}  `"
              class="me-4 px-0 py-0 rounded-lg"
              style="margin-inline-start: 40px !important"
  
              @click="!child.meta.showChildren ? $router.push(child.meta.to) : ''"
            >
              <v-row>
                <v-col class="d-flex align-center">
                  <span class="mx-1 font-size-13">
                    {{ $t(child.title) }}
                  </span>
                </v-col>
              </v-row>
            </v-list-item>
          </template>
          <v-list class="px-1" v-if="child.meta.showChildren">
            <div v-for="nestedChild in child.children" :key="nestedChild.to">
              <v-list-item v-if="nestedChild.meta?.show" :to="nestedChild.meta?.to">
                <Image :name="nestedChild.meta?.icon" />
                <span class="mx-1 font-size-13">
                  {{ nestedChild.title }}
                </span>
              </v-list-item>
            </div>
          </v-list>
        </v-list-group>
      </v-list-group>
    </v-list>
    <template v-slot:append>
      <div
        class="pa-2 ms-2 w-100 d-flex justify-center align-center mt-auto mb-5 sidebar__logout"
      >
        <Button
          variant="text"
          color="black"
          class="sidebar__logout bg-white elevation-2 text-black d-flex align-center justify-start"
          @click="showLogoutDialog = true"
        >
          <span class="me-2">
            <Image name="logout-1.svg" />
          </span>
          <span class="ms-1 text-black">
            {{ $t("example.logout") }}
          </span>
        </Button>
      </div>
    </template>
  </v-navigation-drawer>
  <GenericDialog
  v-model="showLogoutDialog"
  title="example.logout"
  message="example.confirmLogout"
  :persistent="true"
  maxWidth="400"
  @update:dialog="showLogoutDialog = $event"
  @close-dialog="showLogoutDialog = false"
>
  <template #default>
    <div class="d-flex justify-end mt-4">
      <Button
        class="mx-1 text-primary font-weight-bold bg-transparent"
        @click="confirmLogout"
      >
        <span class="font-size-17">
          {{ $t("yes") }}
        </span>
      </Button>
      <Button
        class="mx-1 text-primary font-weight-bold bg-transparent"
        @click="showLogoutDialog = false"
      >
        <span class="text-error font-size-17">
          {{ $t("example.cancel") }}
        </span>
      </Button>
    </div>
  </template>
</GenericDialog>

</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import vuetify from "../../../../plugins/vuetify";
import { useDrawerStore } from "../../../../stores/drawer";
import { useRoute } from "vue-router";
import asyncRoutes from "../../../../router/asyncRoutes";

const route = useRoute();
const opened = ref([]);
let showLogoutDialog = ref(false);

const confirmLogout = () => {
  localStorage.removeItem("_token");
  window.location.href = "/login";
};


watch(opened, (val) => {
  if (val.length > 1) {
    opened.value = [val[val.length - 1]];
  }
});
function isRouteActive(routeItem) {
  if (routeItem.meta?.to && route?.path?.includes(routeItem.meta.to)) {
    return true;
  }

  if (routeItem.children && routeItem.children.length > 0) {
    return routeItem.children.some((child) => isRouteActive(child));
  }

  return false;
}

const drawer = ref(true);
const { drawerResult, toggleDrawer } = useDrawerStore();

const lang = ref("");
const currentLang = () => {
  lang.value = localStorage.getItem("lang");
};

const location = ref("left");
const drawerLocation = () => {
  localStorage.getItem("lang") == "ar"
    ? (location.value = "right")
    : (location.value = "left");
};

const handleDirection = () => {
  vuetify.rtl = lang.value === "ar";
};

const logout = () => {
  localStorage.removeItem("_token");
  window.location.href = "/login";
};

const handleDrawerMobile = () => {
  if (vuetify?.display?.mobile?.value) {
    toggleDrawer();
  }
};

onMounted(async () => {
  handleDrawerMobile();
  currentLang();
  drawerLocation();
  handleDirection();
});
</script>

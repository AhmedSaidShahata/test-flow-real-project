<template>
  <Suspense>
    <v-layout class="pt-3">
      <v-locale-provider :rtl="$i18n.locale == 'ar'">
        <Drawer></Drawer>
        <v-main>
          <Header></Header>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-main>
      </v-locale-provider>
    </v-layout>
  </Suspense>
</template>
<!-- enter-active-class="animate__animated animate__fadeInLeft" leave-active-class="animate__animated animate__fadeOutRight" -->

<script setup>
import Header from "@/components/Shared/Layout/Header/index.vue";
import Drawer from "@/components/Shared/Layout/Sidebar/index.vue";
</script>

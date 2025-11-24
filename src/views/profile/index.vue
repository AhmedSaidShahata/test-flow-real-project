<template>
  <main class="pa-0 ms-lg-n6">
    <!-- Image section -->
    <CardWrapper class="mt-2 me-0 mb-4">
      <div class="px-4 pt-2 pb-10">
        <HeadingPage
          title="edit-profile-heading-title"
          description="edit-profile-heading-description"
          icon="edit-profile-heading.svg"
        />
      </div>
      <v-row class="ma-0">
        <v-col cols="12" md="4" class="ma-0 ps-0">
          <IntroSection title="profile-picture" description="profile-picture-description" />
        </v-col>
        <v-col cols="12" md="8">
          <v-row class="mx-4">
            <FormActionsChangeProfilePicture />
          </v-row>
        </v-col>
      </v-row>
      <div class="px-10 py-6"></div>
    </CardWrapper>

    <!-- Update info section -->
    <CardWrapper class="mt-2 me-0 mb-4">
      <div class="px-10 py-4"></div>
      <!-- <v-container> -->
      <v-row>
        <v-col cols="12" md="4">
          <IntroSection title="main-info-title" description="main-info-description" />
        </v-col>
        <v-col cols="12" md="8">
          <FormActionsUpdateProfileInfo />
        </v-col>
      </v-row>
    </CardWrapper>
    <!-- Update info section -->
    <CardWrapper class="mt-2 me-0 mb-4">
      <div class="px-10 py-4"></div>

      <v-row>
        <v-col cols="12" md="4">
          <IntroSection title="password" description="change-password-description" />
        </v-col>
        <v-col cols="12" md="8">
          <FormActionsChangePassword />
        </v-col>
      </v-row>
    </CardWrapper>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import useApi from '@/composables/useApi'
import FormActionsUpdateProfileInfo from '@/components/FormActions/UpdateProfileInfo/index.vue'
import FormActionsChangePassword from '@/components/FormActions/ChangePassword/index.vue'
import FormActionsChangeProfilePicture from '@/components/FormActions/ChangeProfilePicture/index.vue'
const { post, loadingPost } = useApi()

const submited = async () => {
  let response = await post('/signin', form.value)
  if (response) {
    localStorage.setItem('_token', response?.data?.access_token)
    window.location.href = '/dashboard'
  }
}
</script>

<style lang="scss" scoped>
</style>
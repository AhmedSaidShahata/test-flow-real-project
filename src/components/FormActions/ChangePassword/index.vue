<template>
  <Form @submit="submited" v-if="renderForm">
    <v-row class="ma-0 mx-4">
      <v-col order="1" cols="12" md="6">
        <InputPassword
          validation="required|min:8|max:50"
          :form="form"
          name="password"
          :label="$t('old-password')"
          imageName="password.png"
          :hint="$t('old-password-hint')"
        />
      </v-col>
      <v-col order="2" cols="12" md="6">
        <InputPassword
          validation="required|min:8|max:50"
          :form="form"
          v-model="form.new_password"
          name="new_password"
          :label="$t('new-password')"
          imageName="password.png"
          :hint="$t('new-password-hint')"
        />
      </v-col>
      <v-col order="3" cols="12" md="6">
        <InputPassword
          validation="required|min:8|max:50|confirmed:@new_password"
          :form="form"
          v-model="form.new_password_confirmation"

          name="new_password_confirmation"
          :label="$t('new-password-confirmation')"
          imageName="password.png"
          :hint="$t('new-password-confirmation-hint')"
        />
      </v-col>
    </v-row>
    <v-row class="ma-0">
        <Button
        class="font-weight-bold text-center ps-12 my-5 mt-7  ms-auto me-7"
        radius="15px"
        min-height="40px"
        min-width="130px"
        color="primary"
        icon="plus.svg"
        width="150"
        height="45"
        type="submit"
        :loading="loadingPost"
      >
        {{ $t('save') }}
      </Button>
    </v-row>
  </Form>
</template>

<script setup>
// import { onMounted, onUnmounted } from 'vue'
import { form, submited, loadingPost, renderForm } from './index.js'
</script>

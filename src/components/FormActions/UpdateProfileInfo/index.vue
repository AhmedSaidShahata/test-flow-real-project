<template>
  <Form @submit="submited">
    <v-row class="ma-0 mx-4">
      <v-col order="1" cols="12" md="6">
        <InputText
          validation="required|min:3|max:50"
          :form="form"
          name="firstname"
          :label="$t('profile_firstname')"
          imageName="person-circle.svg"
          :hint="$t('firstname-hint')"
          v-model="form.firstname"

          
        />
      </v-col>
      <v-col order="2" cols="12" md="6">
        <InputText
          validation="required|min:3|max:50"
          :form="form"
          v-model="form.lastname"

          name="lastname"
          :label="$t('profile_lastname')"
          imageName="person-circle.svg"
          :hint="$t('lastname-hint')"
        />
      </v-col>
      <v-col order="2" cols="12" md="6">
        <InputText
          :validation="'email'"
          :form="form"
          name="email"
          :label="$t('email')"
          imageName="email.png"
          :hint="$t('email-hint')"
          disabled
        />
      </v-col>
      <v-col order="3" cols="12" md="6">
        <InputPhone
          :validation="'numeric|numeric_min:9|numeric_max:15'"
          :form="form"
          v-model="form.phone"
          name="phone"
          :label="$t('phone-number')"
          imageName="phone.png"
          :hint="$t('phone-number-hint')"
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
import { onMounted, onUnmounted } from 'vue'
import { form, submited, loadingPost, renderForm, handleShow, resetForm, url } from './index.js'

onMounted(() => {
  handleShow()
})
</script>

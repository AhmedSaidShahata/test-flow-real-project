<template>
  <Form v-if="renderForm" @submit="submited($router)" class="mt-4">
    <v-row style="min-height: 47vh" class="mt-4">
      <v-col cols="12" md="4">
        <IntroSection
          :title="`${$t('pages_crud.edit_data')} ${uiTitle}`"
          :description="`${$t('pages_crud.edit_data_desc')} ${uiTitle}`"
        />
      </v-col>

      <v-col cols="12" md="8">
        <v-row class="px-4">
          <v-col class="px-0" cols="12" md="12">
            <v-col cols="12" md="6">
              <LocaleSelector name="locale" @changed="handleShow($route)" />
            </v-col>
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              :hint="$t('pages_crud.name_hint')"
              imageName="page-name.svg"
              validation="required|min:3|max:255"
              :form="form"
              name="name"
              :label="$t('pages_crud.name_input')"
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              :hint="$t('pages_crud.path_hint')"
              imageName="page-title.svg"
              validation="required|min:3|max:255"
              :form="form"
              name="title"
              :label="$t('pages_crud.path_input')"
            />
          </v-col>
          <v-col class="px-0" cols="12" md="12">
            <v-col cols="12" md="6">
              <InputTextarea
                :hint="$t('pages_crud.description_hint')"
                imageName="text-icon.svg"
                validation="required|min:3|max:40000"
                :form="form"
                name="description"
                :label="$t('pages_crud.description_input')"
              />
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-4">
      <div class="px-4">
        <Button
          class="font-weight-bold text-center ps-12"
          radius="15px"
          min-height="40px"
          min-width="130px"
          color="primary"
          icon="plus.svg"
          type="submit"
          :loading="loadingPost"
        >
          {{ $t('example.save') }}
        </Button>
      </div>
    </div>
  </Form>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { form, submited, loadingPost, renderForm, handleShow, resetForm, uiTitle, url } from './index.js'
import { useRoute } from 'vue-router'

let route = useRoute()

onMounted(() => {
  handleShow(route)
})

onUnmounted(() => {
  resetForm()
})
</script>

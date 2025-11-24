<template>
  <Form v-if="renderForm" @submit="submited($router)" class="mt-4">
    <v-row style="min-height: 47vh" class="mt-4">
      <v-col cols="12" md="4">
        <IntroSection
          title="items_crud.intro_header"
          :description="$t('items_crud.intro_desc')"
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
              :hint="$t('items_crud.name_hint')"
              imageName="item-name.png"
              validation="required|min:3|max:190"
              :form="form"
              name="name"
              :label="$t('items_crud.name_input')"
            />
          </v-col>
          <v-col cols="12" md="6" v-if="hasTitle">
            <InputText
              :hint="$t('items_crud.path_hint')"
              imageName="item-title.png"
              :form="form"
              name="title"
              :label="$t('items_crud.path_input')"
            />
          </v-col>
          <v-col class="px-0" cols="12" md="12" v-if="hasDescription">
            <v-col cols="12">
              <InputEditor
                :form="form"
                name="description"
                :label="$t('items_crud.description_input')"
                :hint="$t('items_crud.description_hint')"
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
import { form, submited, loadingPost, renderForm, handleShow, resetForm, url, hasTitle, hasDescription } from './index.js'
import { useRoute } from 'vue-router'

let route = useRoute()

onMounted(() => {
  handleShow(route)
})

onUnmounted(() => {
  resetForm()
})
</script>

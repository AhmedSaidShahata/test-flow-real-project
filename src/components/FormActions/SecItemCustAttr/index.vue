<template>
  <Form v-if="renderForm" @submit="submited($router)" class="mt-4">
    <v-row style="min-height: 47vh" class="mt-4">
      <v-col cols="12" md="4">
        <IntroSection
          title="items_custom_attr.intro_header"
          :description="$t('items_custom_attr.intro_desc')"
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
              :hint="$t('items_custom_attr.name_hint')"
              imageName="custom-name.png"
              validation="min:3|max:190"
              :form="form"
              name="name"
              :label="$t('items_custom_attr.name_input')"
            />
          </v-col>
          <v-col class="px-0" cols="12" md="12">
            <v-col cols="12" md="6">
          <InputText
              :hint="$t('items_custom_attr.value_hint')"
              imageName="custom-value.png"
              validation="required|min:3|max:190"
              :form="form"
              name="value"
              :label="$t('items_custom_attr.value_input')"
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
import { form, submited, loadingPost, renderForm, handleShow, resetForm, url } from './index.js'
import { useRoute } from 'vue-router'

let route = useRoute()

onMounted(() => {
  handleShow(route)
})

onUnmounted(() => {
  resetForm()
})
</script>

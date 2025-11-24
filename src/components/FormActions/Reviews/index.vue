<template>
  <Form v-if="renderForm" @submit="submited($router)" :validate-on-mount="false">
    <section class="rounded-xl bg-white pt-4 pb-8"> 
      <div class="px-5">
        <HeadingPage
          v-if="isEdit"
          icon="star.svg"
          title="reviews_crud.record.title"
          description="reviews_crud.record.desc_edit"
          class="mb-4"
        />
        

        <HeadingPage
          v-else
          icon="star.svg"
          title="reviews_crud.record.title"
          description="reviews_crud.record.description"
          class="mb-4"
        />
      </div> 
      <v-row class="ma-0">
        
        <!-- <div class="d-flex"> -->
        <v-col cols="12" md="4" class="ma-0 ps-0">
          <IntroSection
            title="reviews_crud.intro_form.first.title"
            :description="isEdit ? 'reviews_crud.intro_form.first.desc_edit' : 'reviews_crud.intro_form.first.description'"
          />
        </v-col>
        <v-col cols="12" md="8">
          <div v-if="isEdit" class="px-0">
            <v-col cols="12" md="6">
              <LocaleSelector name="locale" @changed="handleShow($route)" />
            </v-col>
          </div>

          <v-col
            class="ms-md-0 ms-4 mb-4 mb-sm-0 w-75 d-flex flex-row align-start justify-start ps-0"
          >
            <div v-if="form?.image?.path" class="mb-5">
                <img
                  width="90"
                  height="90"
                  v-if="form?.image?.path"
                  :src="form?.image?.path"
                  class="rounded-circle me-5 me-md-8"
                />
            </div>

            <div class=" w-75">
              <InputFile
                :multiple=false
                @fileSelected="previewFile"
                v-if="isEdit"
                :validation="'size:1024|mimes:image/jpeg,image/jpeg,image/png'"
                :form="form"
                name="image"
                :label="$t('file')"
                class="w-50"
                v-model="form.image"
              />
              <InputFile
                v-else
                :multiple=false
                @fileSelected="previewFile"
                :validation="'required|size:1024|mimes:image/jpeg,image/jpeg,image/png'"
                :form="form"
                name="image"
                :label="$t('file')"
                class="w-50"
                v-model="form.image"
              />
            </div>
          </v-col>
          <v-row class="mt-4">
            
            <v-col cols="12" md="6">
              <InputText
                :hint="$t('reviews_crud.input.name_hint')"
                imageName="person-circle.svg"
                validation="required|min:3|max:100"
                :form="form"
                name="name"
                :label="$t('reviews_crud.input.name')"
              />
            </v-col>
            
            <v-col cols="12" md="6">
              <InputText
                :hint="$t('reviews_crud.input.position_hint')"
                imageName="position.png"
                validation="required|min:3|max:100"
                :form="form"
                name="position"
                :label="$t('reviews_crud.input.position')"
              />
            </v-col>
          </v-row>
        </v-col>
        

      </v-row>
    </section>

    <section class="rounded-xl bg-white py-4 pb-0 mt-2">
      <v-row class="my-3 pb-8">
        <v-col cols="12" md="4">
         <IntroSection
            title="reviews_crud.intro_form.second.title"
            :description="isEdit ? 'reviews_crud.intro_form.second.desc_edit' : 'reviews_crud.intro_form.second.description'"
          />
        </v-col>

        <v-col cols="12" md="8">
          <v-row class="px-4">
           
            <v-col cols="12" md="6">
              <InputSelectField
                :form="form"
                :hint="$t('reviews_crud.input.custome_type_hint')"
                persistent-hint
                v-model="form.customer_type"
                name="customer_type"
                variant="solo"
                :label="$t('reviews_crud.input.customer_type')"
                :validation="'required'"
                :items="customerTypes"
                item-title="name"
                item-value="id"
                imageName="container.png" 
                class="custom-arrow-select"
              />
            </v-col>
           
            <v-col cols="12" md="6">
              <InputTextarea
                :hint="$t('reviews_crud.input.review_hint')"
                imageName="star-icon.png"
                validation="required|min:3|max:10000"
                :form="form"
                name="text"
                :label="$t('reviews_crud.input.review')"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>

    <section class="rounded-xl bg-white py-4 pb-0 mt-2">
      <v-row class="my-3">
        <v-col cols="12" md="4" >
          <IntroSection
            title="reviews_crud.intro_form.third.title"
            :description="isEdit ? 'reviews_crud.intro_form.third.desc_edit' : 'reviews_crud.intro_form.third.description'"
          />
        </v-col>

        <v-col cols="12" md="8">
            <v-col cols="11" md="6" class="mt-6">
              <RatingInput
                :form="form"
                name="rating"
                validation="required"
                :label="$t('reviews_crud.input.customer_review')"
              />

            </v-col>
         
          <div class="d-flex justify-end mt-4">
            <div class="px-4 ">
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
        </v-col>
      </v-row>
    </section>
  </Form>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import {
  form,
  submited,
  loadingPost,
  renderForm,
  handleShow,
  resetForm,
  previewFile,
  customerTypes,
  getCustomerTypes,
  showValidationError
} from './index.js'
import { useRoute } from 'vue-router'
import { useIsEdit } from '@/composables/useIsEdit'
import { ref } from 'vue'
import useApi from '@/composables/useApi'
import RatingInput from '@/components/Shared/Input/Rating/index.vue'

let route = useRoute()
const { isEdit } = useIsEdit()

let { get } = useApi()

onMounted(async () => {
  await getCustomerTypes()
  handleShow(route)
})

onUnmounted(() => {
  resetForm()
})
</script>

<template>
  <Form v-if="renderForm" @submit="submited($router)" class="mt-2" :validate-on-mount="false">
    <div v-if="loadingGet && isEdit" class="loading-overlay">
      <v-progress-circular indeterminate color="primary" />
      <span>{{ $t('loading_text') || 'Loading...' }}</span>
    </div>
    <div v-else>
      <section class="rounded-xl bg-white py-4 pb-15 mt-2">
        <div class="px-4">
          <HeadingPage
            v-if="isEdit"
            icon="blogs-dark.svg"
            title="blogs_crud.heading_edit.title"
            description="blogs_crud.heading_edit.description"
            class="mb-14"
          />

          <HeadingPage
            v-else
            icon="blogs-dark.svg"
            title="blogs_crud.heading_create.title"
            description="blogs_crud.heading_create.description"
            class="mb-14"
          />
        </div>
        <v-row class="ma-0">
          <!-- <div class="d-flex"> -->
          <v-col cols="12" md="4" class="ma-0 ps-0">
            <IntroSection
              v-if="isEdit"
              title="blogs_crud.intro_edit.image.title"
              description="blogs_crud.intro_edit.image.description"
            />
            <IntroSection
              v-else
              title="blogs_crud.intro_create.image.title"
              description="blogs_crud.intro_create.image.description"
            />
          </v-col>
          <v-col cols="12" md="8">
            <div v-if="isEdit" class="px-0">
              <!-- <v-col v-if="isEdit" class="px-0" cols="12" md="12"> -->
              <v-col cols="12" md="6">
                <LocaleSelector name="locale" @changed="handleShow($route)" />
              </v-col>
              <!-- </v-col> -->
            </div>

            <v-col
              class="me-sm-15 ms-0 ms-sm-10 ms-md-n2 mb-4 mb-sm-0 w-75 d-flex flex-column flex-md-row align-start justify-start"
            >
              <div class="mb-5">
                <!-- <img
                v-if="isEdit"
                radius="19px"
                :src="form?.main_image?.path"
                :width="$vuetify?.display?.xs ? 60 : 80"
                :height="$vuetify?.display?.xs ? 60 : 80"
              /> -->

                <!-- <MediaImg
                v-if="isEdit"
                :path="preview || form?.main_image?.path"
                :id="form?.main_image?.id"
                :alt="form?.main_image?.alt || 'media image'"
                class="w-100 w-md-25 mt-4"
                :slug="form?.slug"
                url="blogs"
                :deletable="false"
              /> -->
                <MediaImg
                  v-if="isEdit"
                  :path="preview || currentMainImagePath"
                  :id="form?.main_image?.id"
                  :alt="form?.main_image?.alt || 'media image'"
                  class="w-100 w-md-25"
                  :slug="form?.slug"
                  url="blogs"
                  :deletable="false"
                />
                <img
                  v-else-if="preview && !isEdit"
                  :src="preview"
                  radius="19px"
                  class="rounded-lg mb-2 media__img"
                  :height="$vuetify?.display?.xs ? 60 : 80"
                  :width="$vuetify?.display?.xs ? 60 : 80"
                />
              </div>

              <div class="mx-0 mx-sm-7 w-75">
                <!-- file functionality as a part of form to apply validation -->
                <InputFile
                  ref="mainImageInput"
                  multiple="false"
                  @fileSelected="previewFile"
                  v-if="isEdit"
                  :validation="'size:1024|mimes:image/jpeg,image/jpeg,image/png|length:1'"
                  :form="form"
                  name="main_image"
                  :label="$t('file')"
                  class="w-50"
                  v-model="form.main_image"
                />
                <InputFile
                  v-else
                  ref="mainImageInput"
                  multiple="false"
                  @fileSelected="previewFile"
                  :validation="'required|size:1024|mimes:image/jpeg,image/jpeg,image/png|length:1'"
                  :form="form"
                  name="main_image"
                  :label="$t('file')"
                  class="w-50"
                  v-model="form.main_image"
                />
              </div>
            </v-col>
          </v-col>
        </v-row>
      </section>
      <section class="rounded-xl bg-white py-4 pb-0 mt-2">
        <v-row class="my-3 pb-8">
          <v-col cols="12" md="4">
            <IntroSection
              v-if="isEdit"
              title="blogs_crud.intro_edit.meta_data.title"
              description="blogs_crud.intro_edit.meta_data.description"
            />
            <IntroSection
              v-else
              title="blogs_crud.intro_create.meta_data.title"
              description="blogs_crud.intro_create.meta_data.description"
            />
          </v-col>

          <v-col cols="12" md="8">
            <v-row class="px-4">
              <!--  slug -->

              <v-col cols="12" md="6">
                <InputText
                  :hint="$t('blogs_crud.input.slug_hint')"
                  imageName="link-icon.svg"
                  validation="alpha_dash|required|min:3|max:50"
                  :form="form"
                  name="slug"
                  :label="$t('blogs_crud.input.slug')"
                />
              </v-col>
              <v-col cols="12" md="6"> </v-col>
              <!--  blog meta title -->
              <v-col cols="12" md="6">
                <InputText
                  :hint="$t('blogs_crud.input.meta_title_hint')"
                  imageName="four-squares.svg"
                  validation="required|min:3|max:255"
                  :form="form"
                  name="meta_title"
                  :label="$t('blogs_crud.input.meta_title')"
                />
              </v-col>
              <!--  blog meta description -->
              <v-col cols="12" md="6">
                <InputText
                  :hint="$t('blogs_crud.input.meta_description_hint')"
                  imageName="four-squares.svg"
                  validation="required|min:3|max:65000"
                  :form="form"
                  name="meta_description"
                  :label="$t('blogs_crud.input.meta_description')"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
      <section class="rounded-xl bg-white py-4 pb-0 mt-2">
        <v-row style="min-height: 47vh" class="my-3 pb-10">
          <v-col cols="12" md="4">
            <IntroSection
              v-if="isEdit"
              title="blogs_crud.intro_edit.blogs_data.title"
              description="blogs_crud.intro_edit.blogs_data.description"
            />
            <IntroSection
              v-else
              title="blogs_crud.intro_create.blogs_data.title"
              description="blogs_crud.intro_create.blogs_data.description"
            />
          </v-col>

          <v-col cols="12" md="8">
            <v-row class="px-4">
              <!--  blog name -->
              <v-col cols="12" md="6">
                <InputText
                  :hint="$t('blogs_crud.input.name_hint')"
                  imageName="contact-circle.svg"
                  validation="required|min:3|max:100"
                  :form="form"
                  name="name"
                  :label="$t('blogs_crud.input.name_hint')"
                />
              </v-col>
              <!--  blog category -->
              <v-col cols="12" md="6">
                <InputSelectField
                  :form="form"
                  :hint="$t('blogs_crud.input.blog_category_hint')"
                  persistent-hint
                  v-model="form.blog_category"
                  name="blog_category"
                  variant="solo"
                  :label="$t('blogs_crud.input.blog_category')"
                  :validation="'required'"
                  :items="allBlogCategories"
                  item-title="name"
                  item-value="id"
                  imageName="four-squares.svg"
                  class="custom-arrow-select"
                />
              </v-col>
              <!--  blog tags -->
              <v-col cols="12" md="6">
                <InputSelect
                  :form="form"
                  :hint="$t('blogs_crud.input.blog_tags_hint')"
                  persistent-hint
                  v-model="form.tags"
                  name="tags"
                  variant="solo"
                  :label="$t('blogs_crud.input.blog_tags')"
                  :validation="''"
                  :items="allTags"
                  item-value="id"
                  item-title="name"
                  :multiple="true"
                  :chips="true"
                  imageName="hashtag-icon.svg"
                  class="custom-arrow-select"
                />
              </v-col>

              <!-- visible -->
              <!-- <v-col cols="12" md="6">
              <LabelToggle :form="form" name="available" />
            </v-col> -->
            </v-row>
            <v-row>
              <!--  blog desc -->
              <v-col cols="12">
                <InputEditor
                  class="mx-3"
                  :hint="$t('blogs_crud.input.description_hint')"
                  imageName="input-name.svg"
                  :validation="'required|min:3|max:65000'"
                  :form="form"
                  v-model="form.blogDescription"
                  name="blogDescription"
                  :label="$t('blogs_crud.input.description')"
                />
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
          </v-col>
        </v-row>
      </section>
    </div>
  </Form>
</template>

<script setup>
import { onMounted, onUnmounted, computed, ref } from 'vue'
import {
  form,
  submited,
  loadingPost,
  preview,
  renderForm,
  handleShow,
  resetForm,
  url,
  getAllTags,
  allTags,
  previewFile,
  allBlogCategories,
  getBlogCategories,
  fileValidation,
  currentBlog,
  loadData,
  loadingGet,  mainImageInput,
  checkFileValidation,
  isMainImageValid, currentMainImagePath
} from './index.js'
import { useRoute } from 'vue-router'
import { useIsEdit } from '@/composables/useIsEdit'
import useApi from '@/composables/useApi'
import MediaImg from '@/components/MediaImg/index.vue'

let route = useRoute()
const { isEdit } = useIsEdit()

let { get } = useApi()


onMounted(async () => {
  await getAllTags()
  await getBlogCategories()
  handleShow(route)
})

onUnmounted(() => {
  resetForm()
})
</script>

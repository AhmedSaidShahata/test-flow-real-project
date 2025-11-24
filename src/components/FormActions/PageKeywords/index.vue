<template>
  <Form v-if="renderForm" @submit="submited($router)">
    <v-row class="pa-0 ma-0 ga-0 ga-md-15">
      <v-col cols="12" md="4" class="ps-0">
        <IntroSection
          title="keyword"
          description="pages-keywords_crud.actions.create.description"
        />
      </v-col>
      <v-col cols="12" md="6" class="mt-5 px-md-0 px-10">
        <v-row class="pa-0 ma-0">
          <v-col cols="12" sm="8" class="d-flex justify-center align-center px-0">
            <InputSelect
              :form="form"
              :hint="false"
              hide-details
              v-model="form.keywords"
              name="keywords"
              variant="solo"
              :label="$t('add-page-keyword')"
              :validation="'numeric'"
              :items="availableKeywords"
              item-value="id"
              item-title="name"
              :multiple="true"
              :chips="true"
              imageName="search-normal.png"
              class="custom-arrow-select"
            />
          </v-col>
          <v-col cols="12" sm="4" class="pe-sm-0 px-0 ps-sm-6 pa-3" >
            <Button
              @click="addKeywords"
              class="font-weight-bold text-center ps-12 w-100 h-100"
              radius="15px"
              min-height="40px"
              min-width="130px"
              color="primary"
              icon="plus.svg"
              type="button"
              v-if="$hasPermission('pages-keywords_create')"
            >
              {{ $t('add') }}
            </Button>
          </v-col>
          
          <v-col cols="12" class="bg-primary-25 rounded-xl py-0 px-5 my-8">
            <div
         
              v-for="keyword in workingKeywords"
              :key="keyword.id"
              class="w-100 my-9 font-weight-bold d-flex justify-space-between align-center"
            >
              <span>{{ keyword.name }}</span>
              <CustomDestroy
                :deleteFunction="() => deleteKeywordFromPage(keyword)"
                :customLoading="false"
                title="keywords_crud.delete.title"
                description="keywords_crud.delete.description"
                outerIcon="white-trash.svg"
                v-if="$hasPermission('pages-keywords_create')"
              />
            </div>
            <div v-if="loadingGet" class="w-100 d-flex justify-center align-center my-9 pa-9">
              <v-progress-circular indeterminate color="primary"  class="me-2"/>
              <span>{{ $t('loading_text') || 'Loading...' }}</span>
            </div>
          </v-col>
        </v-row>
        
        <v-row class="ma-0 pa-0">
          <Button
            class="font-weight-bold text-center ps-12 ms-auto"
            radius="15px"
            min-height="40px"
            min-width="130px"
            v-if="$hasPermission('pages-keywords_create')"
            color="primary"
            icon="plus.svg"
            type="submit"
            :loading="loadingPost"
          >
            {{ $t('save') }}
          </Button>
        </v-row>
      </v-col>
    </v-row>
  </Form>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import {
  form,
  loadingPost,
  renderForm,
  handleShow,
  resetForm,
  url,
  getAllKeywords,
  getPageKeywords,
  allKeywords,
  pageKeywords,
  workingKeywords,
  availableKeywords,
  submited,
  addKeywords,
  deleteKeywordFromPage,
  loadingGet
} from './index.js'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(async () => {
  await getAllKeywords()
  handleShow(route)
})

onUnmounted(() => {
  resetForm()
})
</script>
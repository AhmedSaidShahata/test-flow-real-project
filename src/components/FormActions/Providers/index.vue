<template>
  <section class="ms-lg-n6">
    <Form @submit="submited($router)">
      <section class="bg-white rounded-xl pa-5 mt-n4">
        <div class="d-flex justify-space-between align-center flex-wrap">
          <HeadingPage
            :title="
              isEdit ? 'providers_crud.intro_edit.title' : 'providers_crud.intro_create.title'
            "
            icon="providers-black.svg"
            :description="
              isEdit
                ? 'providers_crud.intro_edit.description'
                : 'providers_crud.intro_create.description'
            "
          >
     
            <LocaleSelector
              v-if="isEdit"
              name="locale"
              @changed="handleShow($route)"
              customIcon="locale-select-icon.svg"
              class="heading-page__locale-selector"
            >
            </LocaleSelector>
   
          </HeadingPage>
        </div>
        <div v-if="loadingGet" class="text-center py-8 d-flex flex-column justify-center align-center" style="min-height: 480px;">
          <v-progress-circular indeterminate color="primary" />
          <p class="mt-2">{{ $t('loading') }}</p>
        </div>
        <div v-else>
          <v-row class="ms-n8 pb-1">
            <v-col cols="12" md="4">
              <div class="px-10 py-5"></div>
              <IntroSection
                title="providers_crud.add_main_company_info.title"
                description="providers_crud.add_main_company_info.description"
              />
              <div class="px-10 py-5 d-none d-md-block"></div>
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="ps-md-0 ps-10 d-flex pt-0 pt-md-10 flex-column flex-sm-row"
            >
              <div class="py-10 me-16 pb-0 pb-sm-2">
                <p
                  class="bg-primary-25 px-6 py-2 font-weight-black"
                  style="border-radius: 16px; max-width: fit-content"
                >
                  {{ $t('company_logo') }}
                </p>
              </div>

              <div class="d-flex">
                <div class="ms-sm-10 ms-0 mt-8 d-flex flex-column providers-file-input__wrapper" v-if="!isEdit">
                  <InputFile
                    :multiple="false"
                    @fileSelected="previewFile"
                    validation="required|mimes:image/jpeg,image/png,image/jpg|size:1024"
                    :form="form"
                    name="logo"
                    :label="$t('providers_crud.labels.logo')"
                    class="w-50"
                    :hint="$t('img-hint-1024')"
                  />
                </div>
                <div v-else class="ms-sm-10 ms-0 mt-8 d-flex flex-column providers-file-input__wrapper">
                  <InputFile
                    :multiple="false"
                    @fileSelected="previewFile"
                    validation="mimes:image/jpeg,image/png,image/jpg|size:1024"
                    :form="form"
                    name="logo"
                    :label="$t('providers_crud.labels.logo')"
                    class="w-50"
                    :hint="$t('img-hint-1024')"
                  />
                </div>
                <div v-if="form?.logo?.path" class="mt-8 ms-6 order-sm-0">
                  <img width="75" height="75" :src="form?.logo?.path" class="rounded-circle" />
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row class="ms-n8 pb-1 justify-md-end">

            <v-col cols="12" md="8" class="ps-md-0 ps-8">
              <v-row>
                <v-col cols="12" md="6">
                  <InputText
                    validation="required|min:3|max:100"
                    :form="form"
                    name="display_name"
                    :label="$t('providers_crud.labels.display_name')"
                    imageName="bank-icon.svg"
                    customIconClass="mx-1"
                    :hint="$t('providers_crud.hints.display_name')"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <InputText
                    validation="required|min:5|max:50"
                    :form="form"
                    name="registration_number"
                    customIconClass="mx-1"
                    :label="$t('providers_crud.labels.registration_number')"
                    imageName="document-icon.svg"
                    :hint="$t('providers_crud.hints.registration_number')"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <InputText
                    validation="required|min:3|max:100"
                    :form="form"
                    name="legal_name"
                    :label="$t('providers_crud.labels.legal_name')"
                    imageName="bank-icon.svg"
                    customIconClass="mx-1"
                    :hint="$t('providers_crud.hints.legal_name')"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <InputText
                    validation="required|min:3|max:50|alpha_dash"
                    :form="form"
                    name="identifier"
                    :label="$t('providers_crud.labels.identifier')"
                    imageName="html-icon.svg"
                    :hint="identifierHint"
                    :disabled="isEdit"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <InputAutoComplete
                    name="country"
                    :form="form"
                    :label="$t('providers_crud.labels.country')"
                    validation="required"
                    :items="allCountries"
                    item-title="name"
                    item-value="id"
                    imageName="global-search.svg"
                    :hint="$t('providers_crud.hints.country')"
                    autocomplete="off"
                    class="autocomplete-component"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <InputAutoComplete
                    :form="form"
                    name="city"
                    :label="$t('providers_crud.labels.city')"
                    validation="required"
                    :items="filteredCities"
                    item-title="name"
                    item-value="id"
                    imageName="global-search.svg"
                    :hint="$t('providers_crud.hints.city')"
                    :nullable="true"
                    autocomplete="off"
                    class="autocomplete-component"
                    :loading="loadingCities"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </section>

      <section v-if="!loadingGet" class="bg-white rounded-xl pa-5 mt-4">
        <v-row class="ms-n8 pb-1">
          <v-col cols="12" md="4">
            <div class="px-10 py-2"></div>
            <IntroSection
              title="providers_crud.add_contact_info.title"
              description="providers_crud.add_contact_info.description"
            />
            <div class="px-10 py-5"></div>
          </v-col>
          <v-col cols="12" md="8" class="ps-md-0 ps-8">
            <div class="px-10 py-6 d-none d-md-block"></div>

            <v-row>
              <v-col cols="12" md="6">
                <InputText
                  validation="required|min:3|max:100"
                  :form="form"
                  name="contact_name"
                  :label="$t('providers_crud.labels.contact_name')"
                  imageName="locate-person-icon.svg"
                  :hint="$t('providers_crud.hints.contact_name')"
                />
              </v-col>
              <v-col cols="12" md="6">
                <InputPhone
                  :validation="'required|numeric|numeric_min:9|numeric_max:15'"
                  :form="form"
                  name="phone"
                  v-model="form.phone"
                  :label="$t('providers_crud.labels.contact_phone')"
                  imageName="phone-icon.svg"
                  :hint="$t('providers_crud.hints.contact_phone')"
                />
              </v-col>
              <v-col cols="12" md="6">
                <InputText
                  validation="required|email|min:3|max:50"
                  :form="form"
                  name="contact_email"
                  :label="$t('providers_crud.labels.contact_email')"
                  imageName="email.png"
                  :hint="$t('providers_crud.hints.contact_email')"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-4">
          <Button
            class="font-weight-bold text-center"
            radius="15px"
            min-height="40px"
            min-width="130px"
            type="submit"
            color="primary"
            :loading="loadingPost"
          >
            {{ $t('example.save') }}
          </Button>
        </div>
      </section>
    </Form>
  </section>
</template>
 
<script setup>
import {
  post,
  loadingPost,
  form,
  submited,
  renderForm,
  handleShow,
  resetForm,
  filteredCities,
  url,
  previewFile, loadingGet
} from './index.js'
import { onMounted, onUnmounted, watch, computed, render } from 'vue'
import { useRoute } from 'vue-router'
import { useIsEdit } from '@/composables/useIsEdit'
import { useI18n } from 'vue-i18n'
import { useCountriesStore } from '@/stores/countries'

const { t } = useI18n()
const { allCountries } = useCountriesStore()

let route = useRoute()
const { isEdit } = useIsEdit()

const identifierHint = computed(() =>
  isEdit.value
    ? t('providers_crud.hints.identifier_disabled')
    : t('providers_crud.hints.identifier')
)

onMounted(async () => {
  await useCountriesStore().getCountries()
  handleShow(route)
})
onUnmounted(() => {
  resetForm()
})
</script>
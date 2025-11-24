<template>
  <div class="white gray-background">
    <Accordion
      v-for="(section_group, section_group_index) in section_groups"
      :key="section_group.id"
      :title="section_group.name"
      :description="section_group.description"
      class="mt-3"
    >
          <v-form
            v-for="(section, index) in section_group.project_settings"
            :key="section.id"
            @submit.prevent="submitForm(route.params.id, section_group.id, section, locale.value)"
            class="mb-3"
          >
            <v-card flat class="pa-2">
              <v-row class="pt-6">

              <v-col cols="12" md="4">
                <p class="mb-5 font-weight-bold">{{ section.description }}</p>
              </v-col>
              <v-col cols="12" md="6">
                <LocaleSelector
                v-if="section.translatable"
                v-model="section.selectedLocale"
                  @changed="(newLocale) => handleSectionLocaleChange(newLocale, route.params.id, section_group.id, section, index, section_group_index)"
                />
                <InputEditor
                v-if="section.type && section.type.name === 'textarea'"
                :hint="$t('enter_field')"
                :title="section.name"
                :name="section.key"
                :label="section.name"
                v-model="section.value"
                :validation="'required|' + removeUnusedValidation(section.validation_rule)"
                :form="section"
              />

             

              <InputText
                v-else-if="section.type && ['text', 'string', 'link', 'email'].includes(section.type.name)"
                class="py-3"
                rows="4"
                :hint="$t('enter_field')"
                :title="section.name"
                :name="section.key"
                v-model="section.value"
                :validation="'required|' + removeUnusedValidation(section.validation_rule) + (section.type.name === 'link' ? '|url' : '')"
                :form="section"
                :label="section.name"
                :imageName="section.type.name === 'email' ? 'email.png' : section.type.name === 'link' ? 'link.png' : ''"
              />

              <InputText
                v-else-if="section.type &&  ['numeric'].includes(section.type.name)"
                class=" py-3"
                rows="4"
                :hint="$t('enter_field')"
                :title="section.name"
                :name="section.key"
                v-model="section.value"
                :validation="'required|' + removeUnusedValidation(section.validation_rule)"
                :form="section"
                :label="section.name"
              />

              <v-switch
                v-else-if="section.type && section.type.name === 'boolean'"
                :active="section.value == 1"
                v-model="section.value"
                inset
                hide-details
                color="secondary"
                :validation="'required|' + removeUnusedValidation(section.validation_rule)"
                :form="section"
              />
            
                <InputPhone
                v-if="section.type && section.type.name === 'phone'"
                validation="numeric|numeric_min:9|numeric_max:15"
                :form="section.phone"
                name="number"
                :label="section.name"
                :hint="$t('enter_field')"
                imageName="phone.png"
                :modelValue="section.phone?.number"
                @update:modelValue="(val) => updatePhoneNumber(section, val)"
              />

              <InputFile
                v-if="section.type && section.type.name === 'image'"
                class="my-3"
                :maxSize="1024"
                @fileSelected="uploadFile"
                text="upload_img"
                :form="section"
              >
                <div v-if="section.image && !form.main_image.path">
                  <img :src="section.image.path" width="100px" height="100px" />
                </div>
                <div v-else>
                  <img :src="form.main_image.path" width="100px" height="100px" />
                </div>
              </InputFile>
               </v-col>

              </v-row>
              <div
                v-if="$hasPermission('project-setting-groups-project-setting-sections-project-settings_edit')"
                class="d-flex justify-end mt-n3 mb-2 pt-5 align-end"
              >
                <Button class="font-weight-bold text-center"
                          radius="15px"
                          min-height="40px"
                          min-width="130px" 
                          type="submit" 
                          color="primary">{{ $t("save") }}</Button>
              </div>
            </v-card>
          </v-form>

      
    </Accordion>
  </div>
</template>

<script setup>
import Accordion from "@/components/Accordion/index.vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n"

const { locale } = useI18n()
import {
  form,
  section_groups,
  handleShow,
  handleShowSection,
  removeUnusedValidation,
  uploadFile,
  submitForm,
} from "./index.js";

const route = useRoute();

const handleSectionLocaleChange = (newLocale, groupId, secID, section, index, groupIndex) => {
  // Update local section.locale
  section.selectedLocale = newLocale;

  // Call your API to get updated data
  handleShowSection(groupId, secID, section, index, groupIndex);
};

onMounted(() => {
  handleShow(route.params.id);
});

watch(
  () => route.params.id,
  () => {
    handleShow(route.params.id);
  }
);
</script>

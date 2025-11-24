<template>
    <section class="ms-md-n6 ms-0">
        <Form v-if="renderForm" @submit="submited($router)">
        <section class="bg-white rounded-xl pa-5 mt-n4">
            <div class="d-flex justify-space-between align-center flex-wrap">
                <HeadingPage :title="isEdit ?  'users_crud.heading_edit.title' : 'users_crud.heading_create.title'" :description="isEdit ?  'users_crud.heading_edit.description' : 'users_crud.heading_create.description'" />
            </div>
        <v-row class="ms-n8 pb-1">
            <v-col cols="12" md="4">
                <div class="px-10 py-5"></div>
                <IntroSection
                title="users_crud.intro_image.title"
                description="users_crud.intro_image.description"
                />
                <div class="px-10 py-5"></div>
            </v-col>
            <v-col cols="12" md="8" class="ps-md-0 ps-10 d-flex pt-0 pt-md-10">
                <div class="py-10"></div>
                <div v-if="form?.image?.path" class="mt-8 ms-md-0">
                        <img
                            width="90"
                            height="90"
                            v-if="form?.image?.path"
                            :src="form?.image?.path"
                            class="rounded-circle"
                        />
                </div>
                <div v-if="!isEdit" class="ms-sm-8  ms-3 mt-8  d-flex flex-column align-center justify-center">
                    <InputFile
                    :multiple=false
                    @fileSelected="previewFile"
                    validation="mimes:image/jpeg,image/png,image/jpg|size:512"
                    :form="form"
                    name="image"
                    :label="$t('file')"
                    class="w-50"
                    :hint="$t('user-img-hint')"
                    />
                </div>
            </v-col>
        </v-row>
        </section>
 
        <section class="bg-white rounded-xl pa-5 mt-4">
        <v-row class="ms-n8 pb-1">
            <v-col cols="12" md="4">
                <div class="px-10 py-5"></div>
                <IntroSection
                title="users_crud.intro_info.title"
                description="users_crud.intro_info.description"
                />
                <div class="px-10 py-5"></div>
            </v-col>
            <v-col cols="12" md="8" class="ps-md-0 ps-8">
                <div class="px-10 py-8"></div>
                <v-row>
                    <v-col cols="12" md="6">
                        <InputText
                        validation="required|min:3|max:20"
                        :form="form"
                        name="firstname"
                        :label="$t('users_crud.input.first-name_label')"
                        imageName="person-circle.svg"
                        :hint="$t('users_crud.input.first-name_hint')"
                        :disabled="isEdit"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <InputText
                        validation="required|min:3|max:20"
                        :form="form"
                        name="lastname"
                        :label="$t('users_crud.input.last-name_label')"
                        imageName="person-circle.svg"
                        :hint="$t('users_crud.input.last-name_hint')"
                        :disabled="isEdit"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <InputText
                        validation="required|email|max:50"
                        :form="form"
                        name="email"
                        :label="$t('users_crud.input.email_label')"
                        imageName="email.png"
                        :hint="$t('users_crud.input.email_hint')"
                        :disabled="isEdit"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <InputPhone
                        :validation="'numeric|numeric_min:9|numeric_max:15'"
                        :form="form"
                        name="phone"
                        :label="$t('users_crud.input.phone_label')"
                        imageName="phone.png"
                        :hint="$t('users_crud.input.phone_hint')"
                        :disabled="isEdit"
                        />
                    </v-col>
                    <!-- <v-col cols="12" md="6">
                        <InputSelect validation="max:10000"  :form="form" name="language" :label="$t('users_crud.input.lang_label')" :hint="$t('users_crud.input.lang_hint')" imageName="locale-globe.svg" :items="languages" :disabled="isEdit"/>
                    </v-col> -->
                    <v-col cols="12" md="6">
                        <InputSelect :form="form" name="role" :label="$t('users_crud.input.role_label')" :hint="$t('users_crud.input.role_hint')" imageName="role.svg" :items="roles" class="custom-arrow-select"/>
                    </v-col>
                    <v-col cols="12" md="6" v-if="!isEdit">
                        <InputPassword
                        validation="required|min:8|max:50"
                        :form="form"
                        name="password"
                        :label="$t('users_crud.input.password_label')"
                        imageName="password.png"
                        :hint="$t('users_crud.input.password_hint')"
                        autocomplete="new-password"
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
                    :loading="loadingPost">
                    {{ $t("example.save") }}
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
  url,
  getRoles,
  roles,
  previewFile
} from "./index.js";
import { onMounted, onUnmounted, watch} from "vue";
import { useRoute } from "vue-router";
import { useIsEdit } from "@/composables/useIsEdit";
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

let route = useRoute();
const { isEdit } = useIsEdit();


onMounted(async () => {
  handleShow(route);
//   await getLanguages();
  await getRoles();
});
onUnmounted(() => {
  resetForm();
});
 
watch(
  roles,
  (newVal) => {
    if (isEdit?.value && newVal?.length && !newVal.find(r => r.id === '')) {
      roles.value.unshift({ id: '', name: t("no_role") });
    }
  },
  { immediate: true }
);


</script>
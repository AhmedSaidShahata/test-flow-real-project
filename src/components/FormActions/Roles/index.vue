<template>
    <section>
        <Form v-if="renderForm" @submit="submited($router)">
        <section class="bg-white rounded-xl pa-5">
            <div class="d-flex justify-space-between align-center flex-wrap">
                <HeadingPage :title="isEdit ? 'heading.edit-role' :'heading.new-role'" :description="isEdit ? 'heading.edit-role-desc' : 'heading.new-role-desc'" />
            </div>
        <v-row class="ms-n8 pb-1">
            <v-col cols="12" md="4">
                <div class="px-10 py-5"></div>
                <IntroSection
                title="heading.basic-info"
                description="heading.basic-roles"
                />
                <!-- <div class="px-10 py-5"></div> -->
            </v-col>
            <v-col cols="12" md="8" class="pt-10">
                <!-- <div class="py-5"></div> -->
                <v-row class="pt-md-4">
                    <v-col cols="12" v-if="isEdit" class="ps-7">
                        <v-col cols="12" md="6" class="pa-0 pe-md-4 pe-0">
                            <LocaleSelector name="locale" @changed="handleShow($route)" />
                        </v-col>
                    </v-col>
                    <v-col  cols="12" md="6" class="ps-7">
                        <InputText validation="required|min:3|max:191"  :form="form" name="name" :label="$t('field.role-name')" :hint="$t('hint.role')" imageName="role-icon.png"/>
                    </v-col>
                    <v-col cols="12" md="6" class="ps-7">
                        <InputText validation="max:10000"  :form="form" name="description" :label="$t('field.role-desc')" :hint="$t('hint.role-desc')" imageName="role-desc.png"/>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <div class="d-flex justify-end mt-4" v-if="!isEdit">
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

        <section class="bg-white rounded-xl pa-5 mt-4" v-if="isEdit">
            <v-row class="ms-n8 pb-1 pt-md-4" v-if="!loadData">
                <v-col cols="12" md="4">
                    <div class="px-10 py-5"></div>
                    <IntroSection
                    title="heading.roles"
                    description="heading.add-role"
                    />
                
                    <!-- <div class="px-10 py-5"></div> -->
                </v-col>
                <v-col cols="12" md="8" class="ps-8 pt-13 ps-md-0">
                    <!-- <div class="py-9"></div> -->
                    <!-- Select All Permissions -->
                    <div class="d-flex align-start flex-column">
                        <h3 class="px-6">{{ $t('basic-permissions') }}</h3>
                        <div class="d-flex align-center mt-2 px-6">
                            <v-checkbox
                            :model-value="allSelected"
                            @click="selectAll(!allSelected)"
                            :true-icon="'mdi-check-circle'"
                            :false-icon="'mdi-circle-outline'"
                            color="black"
                            class="mb-3 rounded-circle"
                            ></v-checkbox>
                        <span class="weight-800 size-16 mb-3">
                            {{ $t(`all_permissions`) }}
                        </span>
                        </div>
                    </div>

                    <!-- Permissions -->
                    <PermissionGroup
                    v-for="group in form.permissions"
                    :key="group.id"
                    :group-permission-name="group.name" 
                    >
                    <template v-slot:permission_body>
                        <v-sheet
                        v-for="permission in group.permissions"
                        :key="permission.id"
                        color="white"
                        class="px-3 mb-2"
                        style="border-radius: 12px;"
                        >
                        <!-- Your permission row content here -->
                        <v-row class="w-100 mb-n5">
                            <v-col md="6" cols="12" class="pt-2 mb-n5 mt-3 mt-sm-0">
                            <div class="d-flex align-center custom-checkbox-layout" style="height: 60px">
                                <v-checkbox
                                :true-icon="'mdi-check-circle'"
                                :false-icon="'mdi-circle-outline'"
                                color="black"
                                v-model="permission.selected"
                                class=" px-md-0 px-1 mb-2 ms-md-0 ms-n3"
                                @change="selectAllSubPermissions(permission.id)"
                                :indeterminate="permission.indeterminate"
                                ></v-checkbox>
                                <div class="font-weight-bold size-16 align-self-center">
                                {{ permission.name }}
                                </div>
                            </div>
                            </v-col>
                            <v-spacer class=""></v-spacer>
                            <v-col md="6" cols="12" class="d-flex px-2 justify-end pt-6 pb-7 ">
                            <v-row>
                                <v-col
                                cols="12"
                                sm="3"
                                class="px-md-0 px-2 py-0"
                                v-for="(sub, index) in Array.from({
                                    length: 4,
                                }).map(
                                    (el, index) => (el = permission.sub_permissions[index])
                                )"
                                :key="index"
                                >
                                <div v-if="sub" class="d-flex align-center">
                                    <v-checkbox
                                    :true-icon="'mdi-check-circle'"
                                    :false-icon="'mdi-circle-outline'"
                                    color="black"
                                    v-model="sub.selected"
                                    @change="selectMainPermission"
                                    class="mb-2"
                                    ></v-checkbox>
                                    <div class="weight-800 size-14 align-self-center">
                                    {{ $t(`${sub.name}`) }}
                                    </div>
                                </div>
                                </v-col>
                            </v-row>
                            </v-col>
                        </v-row>
                        </v-sheet>
                    </template>
                    </PermissionGroup>
                </v-col>
            </v-row>
            <!-- Loading spinner -->
            <div v-else class="loading-overlay">
              <v-progress-circular indeterminate color="primary" />
              <span>{{ $t('loading_text') || 'Loading...' }}</span>
            </div>
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
  form,
  submited,
  loadingPost,
  renderForm,
  handleShow,
  resetForm,
  url,
  selectAllSubPermissions,
  selectAll,
  selectMainPermission,
  resetPermissions,
  getAllPermissions,
  loadData
} from "./index.js";
import { useRoute } from "vue-router";
import { onMounted, onUnmounted , computed} from "vue";
import { useIsEdit } from "@/composables/useIsEdit";

const route = useRoute();
const { isEdit } = useIsEdit();


const allSelected = computed(() => {
  return form.value.permissions?.every(group =>
    group.permissions?.every(permission =>
      permission.selected && 
      permission.sub_permissions?.every(sub => sub.selected)
  ) ?? false);
});

const someSelected = computed(() => {
  const hasSelected = form.value.permissions?.some(group =>
    group.permissions?.some(permission =>
      permission.selected || 
      permission.sub_permissions?.some(sub => sub.selected)
  ));
  return ((hasSelected && !allSelected.value) ?? false);
});

onMounted(async () => {
 if(isEdit){
    await getAllPermissions();
 }
  await handleShow(route);
});
onUnmounted(() => {
  resetForm();
});
</script>

<style scoped>
.custom-checkbox-layout .v-input--horizontal {
    grid-template-areas:
        "prepend control append"
        "a messages b";
    grid-template-columns: max-content;
    grid-template-rows: 1fr auto;
}
</style>



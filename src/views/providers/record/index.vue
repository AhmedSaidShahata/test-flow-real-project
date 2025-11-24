<template>
  <section class="position-relative bg-white pa-5 ms-0 ms-lg-n6 rounded-xl pb-5 mt-n4">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <HeadingPage
        icon="providers-black.svg"
        title="providers_crud.record.title"
        description="providers_crud.record.description"
      >
        <div class="mt-2  mt-sm-0 ">
          <Button
            v-if="$hasPermission('providers_create')"
            class="font-weight-bold text-center ps-12"
            radius="15px"
            min-height="40px"
            min-width="130px"
            color="primary"
            :to="`/${url}/create`"
            icon="plus.svg"
          >
            {{ $t('create') }}
          </Button>
        </div>
      </HeadingPage>
    </div>
    <Table class="mb-10" :data="items" :headers="headers" :url="url">
      <template v-slot:item.logo="{ item }">
        <div class="d-flex justify-start align-center">
          <v-avatar color="grey" size="32" class="rounded-circle">
            <img class="w-100 h-100" v-if="item.logo" :src="item.logo?.path" :alt="item.name" />
            <v-icon style="cursor: default" v-else size="30px" icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </div>
      </template>
      <template v-slot:item.company_contact_phone="{ item }">
        {{
          item?.contact_phone
            ? `${item.contact_phone?.country_code}${item.contact_phone?.number}`
            : ''
        }}
      </template>
      <template v-slot:item.blocked="{ item }">
        <PopupToggle
          v-if="$hasPermission('providers_edit')"
          v-model="item.blocked"
          :url="url"
          :id="item.identifier"
          name="blocked"
          icon="block-icon.svg"
          :title="item.blocked ? 'providers_crud.enable.title' : 'providers_crud.block.title'"
          :description="
            item.blocked ? 'providers_crud.enable.description' : 'providers_crud.block.description'
          "
          class="pt-0"
        />
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex">

          <router-link
          v-if="$hasPermission('providers_edit')"
          :to="`/${url}/${item.identifier}/edit`"
          class="mt-2"
          >
          <Image width="30" name="edit.svg" />
        </router-link>
        <Destroy
        v-if="$hasPermission('providers_delete')"
        :url="url"
        :id="item.identifier"
        title="providers_crud.delete.title"
        description="providers_crud.delete.description"
        />
      </div>
      </template>
    </Table>
  </section>
</template>
 
<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const url = ref('providers')
const headers = computed(() => [
  { key: 'logo' },
  { key: 'display_name' },
  { key: 'contact_name' },
  { key: 'contact_email' },
  { key: 'company_contact_phone' },
  { key: 'blocked' },
  { key: 'registration_number' },
  { key: 'actions' }
])


</script>
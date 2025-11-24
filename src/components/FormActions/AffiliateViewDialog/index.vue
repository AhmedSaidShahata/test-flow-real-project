<template>
  <v-dialog v-model="localDialog" max-width="800px" class="destroy custom-dialog">
    <v-card class="rounded-xl px-4">
      <h3 class="text-center py-4">{{ $t('affiliates_crud.view_affiliate') }}</h3>
      <Form @submit="handleSubmit">
        <!-- 1st section -->
        <div class="px-4 pb-4" v-if="affiliateData">
          <v-row class="d-flex flex-wrap">
            <v-col cols="12" md="12" lg="4">
              <div class="my-2 my-lg-0 font-weight-bold pe-lg-16 ps-lg-4 text-center text-lg-start">
                {{ $t('affiliates_crud.popup_title1') }}
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">{{ $t('affiliates_crud.logo') }}</div>
                <div class="my-2 w-50 mx-auto">
                  <img
                    :src="affiliateData?.logo?.path"
                    class="mx-auto"
                    style="border-radius: 50%; width: 60px; height: 60px"
                    alt="Affiliate Logo"
                  />
                </div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">{{ $t('affiliates_crud.type') }}</div>
                <div class="my-2">
                  {{
                    affiliateData?.personal
                      ? $t('affiliates_crud.individuals')
                      : $t('affiliates_crud.companies')
                  }}
                </div>
              </div>
            </v-col>

            <!-- ---------------------2nd section-------------- -->
            <v-col cols="12" md="12" lg="4">
              <div class="my-2 my-lg-0 font-weight-bold pe-lg-12 ps-lg-4 text-center text-lg-start">
                {{ $t('affiliates_crud.popup_title2') }}
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">
                  {{ $t('affiliates_crud.company_name') }}
                </div>
                <div class="my-2">{{ affiliateData?.display_name }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">
                  {{ $t('affiliates_crud.legal_name') }}
                </div>
                <div class="my-2">{{ affiliateData?.legal_name }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">
                  {{ $t('affiliates_crud.identifier') }}
                </div>
                <div class="my-2">{{ affiliateData?.identifier }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">{{ $t('affiliates_crud.link') }}</div>
                <div class="my-2" dir="ltr">{{ affiliateData?.website_url }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">{{ $t('affiliates_crud.reg_num') }}</div>
                <div class="my-2">{{ affiliateData?.registration_number }}</div>
              </div>
            </v-col>

            <!-- -----------------------------------3rd section----------------------------------- -->
            <v-col cols="12" md="12" lg="4">
              <div class="my-2 my-lg-0 font-weight-bold pe-lg-16 ps-lg-4 text-center text-lg-start">
                {{ $t('affiliates_crud.popup_title3') }}
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">
                  {{ $t('affiliates_crud.contact_name') }}
                </div>
                <div class="my-2">{{ affiliateData?.contact_name }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">
                  {{ $t('affiliates_crud.contact_email') }}
                </div>
                <div class="my-2">{{ affiliateData?.contact_email }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">
                  {{ $t('affiliates_crud.contact_phone') }}
                </div>
                <div class="my-2">
                  {{ affiliateData?.contact_phone?.country_code
                  }}{{ affiliateData?.contact_phone?.number }}
                </div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">{{ $t('affiliates_crud.country') }}</div>
                <div class="my-2">{{ affiliateData?.city?.country?.name }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6" lg="4">
              <div class="text-center px-2">
                <div class="bg-primary-25 rounded-xl py-2">{{ $t('affiliates_crud.city') }}</div>
                <div class="my-2">{{ affiliateData?.city?.name }}</div>
              </div>
            </v-col>
            <v-col cols="12" class="my-4 d-flex justify-end" v-if="affiliateData?.approved === false">
              <Button
                class="affiliates__show__btn font-weight-bold me-3 d-flex justify-center"
                radius="15px"
                min-height="40px"
                min-width="130px"
                color="primary"
                type="submit"
                :loading="loadingPost"
              >
                {{ $t('affiliates_crud.accept') }}
              </Button>
            </v-col>
          </v-row>
        </div>
        <div class="d-flex justify-center pb-16 pt-12" v-else>
          <v-progress-circular indeterminate color="primary" class="mx-auto" />
        </div>
      </Form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { affiliateData, loadingPost, submited, fetchAffiliateData } from './index.js'

const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  selectedIdentifier: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'dialog-closed'])

const localDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleSubmit = async () => {
  const success = await submited(props.selectedIdentifier)
  if (success) {
    emit('update:modelValue', false)
    emit('dialog-closed', true)
  }
}


watch([() => props.selectedIdentifier, localDialog], async ([newIdentifier, dialogOpen]) => {
  if (dialogOpen && newIdentifier) {
    await fetchAffiliateData(newIdentifier)
  }
})

// Handle dialog close
watch(localDialog, (newValue) => {
  if (!newValue) {
    emit('dialog-closed', false) 
    affiliateData.value = null
  }
})
</script>

<style scoped>

</style>